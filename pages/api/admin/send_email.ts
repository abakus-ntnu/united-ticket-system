import { withApiAuthRequired } from "@auth0/nextjs-auth0";
import { PrismaClient } from "@prisma/client";
import sendTicket from "../../../lib/mail";

const prisma = new PrismaClient();

export default withApiAuthRequired(async (req, res) => {
  const attendee = await prisma.attendees.findUnique({
    where: {
      id: req.body.id,
    },
  });

  if (attendee === null) {
    return res.send({ message: "Attendee cannot be found", code: 404 });
  }

  try {
    const result = await sendTicket(attendee);
    if ((result.accepted[0] as string).length > 0) {
      await prisma.attendees.update({
        where: {
          id: req.body.id,
        },
        data: {
          email_sent: true,
        },
      });
      return res.send({
        message: "Successfully sent email to " + attendee.email,
        code: 200,
      });
    }
    return res.send({
      message: "Failed to send ticket to " + attendee.email,
      code: 500,
    });
  } catch (e) {
    console.error(e);
    return res.send({
      message: "Failed to send ticket to " + attendee.email,
      code: 500,
    });
  }
});
