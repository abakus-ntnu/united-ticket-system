import { withApiAuthRequired } from "@auth0/nextjs-auth0";
import { PrismaClient } from "@prisma/client";
import sendTickets from "../../../lib/mail";

const prisma = new PrismaClient();

export default withApiAuthRequired(async (req, res) => {
  const attendees = await prisma.attendees.findMany({
    where: {
      active: true,
      email_sent: false,
    },
  });

  if (attendees.length === 0) {
    return res.send({
      message: "All attendess has received an email",
      code: 200,
    });
  }

  let sentEmails, failedEmails;

  try {
    [sentEmails, failedEmails] = await sendTickets(attendees);
    if (failedEmails.length > 0) {
      return res.send({
        message: [sentEmails, failedEmails],
        code: 500,
      });
    }

    return res.send({
      message: [sentEmails, failedEmails],
      code: 200,
    });
  } catch (e) {
    console.error(e);
    return res.send({
      message: [sentEmails, failedEmails],
      code: 500,
    });
  }
});
