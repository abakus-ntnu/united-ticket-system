import { withApiAuthRequired } from "@auth0/nextjs-auth0";
import { PrismaClient } from "@prisma/client";
import sendTickets from "../../../lib/mail";

const prisma = new PrismaClient();

export default withApiAuthRequired(async (req, res) => {
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
