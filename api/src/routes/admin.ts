import { PrismaClient } from "@prisma/client";
import express from "express";
import { Attendee } from "../types";
import validateAttendee from "../validators/attendee";
import sendTickets from "../mail/mail";
const router = express.Router();

const prisma = new PrismaClient();

// Get all attendees
router.get("/attendees", async (req, res) => {
  try {
    res.send(await prisma.attendees.findMany());
  } catch (error) {
    console.error(error);
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
    return res.send({ code: 403, message: "Attendee has already registered" });
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

// Send email to attendees with email_sent=false, and set email_sent true - should accept a list of ids
router.post("/attendees/send_emails", async (req, res) => {
  const attendees = await prisma.attendees.findMany({
    where: {
      email_sent: false,
    },
  });

  try {
    await sendTickets(attendees);
    await Promise.all(
      attendees.map((attendee) =>
        prisma.attendees.update({
          where: {
            id: attendee.id,
          },
          data: {
            email_sent: true,
          },
        })
      )
    );
    res.send({ message: "Emails wast sent", code: 200 });
  } catch (e) {
    console.error(e);
    res.send({ message: "Failed to send emails", code: 500 });
  }
});

export default router;
