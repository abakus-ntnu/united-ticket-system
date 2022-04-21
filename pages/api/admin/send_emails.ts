import { withApiAuthRequired } from "@auth0/nextjs-auth0";
import { PrismaClient } from "@prisma/client";
import sendTickets from "../../../lib/mail";
import SMTPTransport from "nodemailer/lib/smtp-transport";

const prisma = new PrismaClient();

export default withApiAuthRequired(async (req, res) => {
  const attendees = await prisma.attendees.findMany({
    where: {
      email_sent: false,
      active: true,
    },
  });

  try {
    const results = await sendTickets(attendees);
    const rejectedEmailReasons = results
      .filter((result) => result.status === "rejected")
      .map((result) => {
        const rejectedPromise = result as PromiseRejectedResult;
        return rejectedPromise.reason;
      });
    const fulfilledEmails = results
      .filter((result) => result.status === "fulfilled")
      .map((result) => {
        const fulfilledResult =
          result as PromiseFulfilledResult<SMTPTransport.SentMessageInfo>;
        return fulfilledResult.value.accepted[0] as string;
      });
    await Promise.all(
      fulfilledEmails.map((email) =>
        prisma.attendees.updateMany({
          where: {
            email,
          },
          data: {
            email_sent: true,
          },
        })
      )
    );
    res.send({
      message: {
        sent: fulfilledEmails,
        rejected: rejectedEmailReasons,
      },
      code: 200,
    });
  } catch (e) {
    console.error(e);
    res.send({ message: "Failed to send emails", code: 500 });
  }
});
