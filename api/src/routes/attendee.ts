import { PrismaClient } from "@prisma/client";
import express from "express";
const router = express.Router();

const prisma = new PrismaClient();

// Fetch a ticket
router.get("/attendees/:id", async (req, res) => {
  try {
    const attendee = await prisma.attendees.findUnique({
      where: {
        id: req.params.id,
      },
    });
    if (attendee == null) {
      return res.send({ message: "Attendee does not exist", code: 404 });
    }

    if (!attendee.active) {
      return res.send({ message: "Attendee is not active", code: 403 });
    }

    if (attendee.admitted != null) {
      return res.send({ message: "Attendee is already admitted", code: 403 });
    }

    res.send({ message: attendee, code: 200 });
  } catch (e) {
    console.error(e);
    res.send({ message: "Could not get attendee", code: 500 });
  }
});

// Set photo_consent true/false
router.patch("/attendees/:id/photo_consent", async (req, res) => {
  try {
    const attendee = await prisma.attendees.update({
      where: {
        id: req.params.id,
      },
      data: {
        photo_consent: req.body.data.photo_consent,
      },
    });
    res.send({ message: attendee, code: 200 });
  } catch (e) {
    console.error(e);
    res.send({ message: "Could not update attendee photo_consent", code: 500 });
  }
});

export default router;
