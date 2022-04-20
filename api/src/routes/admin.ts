import { PrismaClient } from "@prisma/client";
import express from "express";
import sendTickets from "../mail/mail";
const router = express.Router();

const prisma = new PrismaClient();

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
