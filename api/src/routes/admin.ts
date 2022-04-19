import { PrismaClient } from "@prisma/client";
import express from "express";
import { Attendee } from "../types";
import validateAttendee from "../validators/attendee";
const router = express.Router();

const prisma = new PrismaClient();

// Get all attendees
router.get("/attendees", async (req, res) => {
  try {
    res.send(await prisma.attendees.findMany());
  } catch (error) {
    res.send({ message: "Failed to get attendees", code: 500 });
  }
});

// Insert a list of attendees
router.post("/attendees", async (req, res) => {
  if (
    !req.body?.data ||
    !req.body.data.every((attendee: Partial<Attendee>) =>
      validateAttendee(attendee)
    )
  ) {
    return res.send({
      message: "Illegal attendee data",
      code: 500,
    });
  }

  try {
    const addedAttendees = await prisma.attendees.createMany(req.body);
    res.send({ message: addedAttendees, code: 200 });
  } catch (e) {
    console.error(e);
    res.send({ message: "Failed to add attendees", code: 500 });
  }
});

router.get("/attendees/count", async (req, res) => {
  const total = (await prisma.attendees.count({
    select: {
      _all: true,
      admitted: true,
    },
  })).admitted;

  const last_ten_minutes = await prisma.attendees.count({
    where: {
      admitted: {
        gte: new Date(Date.now() - 10 * 60000)
      }
    }
  })

  return res.send({ code: 200, total: total, last_ten_minutes: last_ten_minutes })
});


// Set admitted = NOW()
router.patch("/attendees/:id/admitted", async (req, res) => {
  const attendeeID = req.params.id;
  const attendee = await prisma.attendees.findUnique({
    where: {
      id: attendeeID,
    },
  });
  if (attendee == null) {
    return res.send({ code: 404, message: "Attendee does not exist" });
  }
  if (!attendee.active) {
    return res.send({ code: 403, message: "Attendee is not active" });
  }

  if (attendee.admitted != null) {
    return res.send({ code: 403, message: attendee.name });
  }

  try {
    const updatedAttendee = await prisma.attendees.update({
      where: {
        id: attendee.id,
      },
      data: {
        admitted: new Date(),
      },
    });

    res.send({ message: updatedAttendee, code: 200 });
  } catch (e) {
    console.error(e);
    res.send({ message: "Failed to admit attendee", code: 500 });
  }
});

// Set active true/false
router.patch("/attendees/:id/active", async (req, res) => {
  if (!req.body?.data) {
    return res.send({
      message: "Data must be set",
      code: 500,
    });
  }

  const attendeeID = req.params.id;
  const attendee = await prisma.attendees.findUnique({
    where: {
      id: attendeeID,
    },
  });
  if (attendee == null) {
    return res.send({ code: 404, message: "Attendee does not exist" });
  }

  try {
    const updatedAttendee = await prisma.attendees.update({
      where: {
        id: attendeeID,
      },
      data: req.body.data,
    });

    res.send({ message: updatedAttendee, code: 200 });
  } catch (e) {
    console.error(e);
    res.send({
      message: "Failed to set active status for attendee",
      code: 500,
    });
  }
});

// Set email_sent true - should accept a list of ids
router.patch("/attendees/email_sent", async (req, res) => {
  if (!req.body?.data) {
    return res.send({
      message: "Data must be an array of user IDs",
      code: 500,
    });
  }

  try {
    const result = await Promise.all(
      (req.body.data as Array<string>).map((userID) =>
        prisma.attendees.update({
          where: {
            id: userID,
          },
          data: {
            email_sent: true,
          },
        })
      )
    );
    res.send({ message: result, code: 200 });
  } catch (e) {
    console.error(e);
    res.send({ message: "Failed to set email_sent", code: 500 });
  }
});

export default router;
