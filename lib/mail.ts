import { Attendees, PrismaClient } from "@prisma/client";
import nodemailer from "nodemailer";
import handlebars from "handlebars";
import mailTemplate from "./mailTemplate";

const prisma = new PrismaClient();

const sendTickets = async (attendees: Attendees[]) => {
  const startMs = Date.now();
  const template = handlebars.compile(mailTemplate);

  const transporter = nodemailer.createTransport({
    host: "smtp-relay.gmail.com",
    port: 587,
    secure: false,
    auth: {
      type: "OAuth2",
      user: "noreply@abakus.no",
      serviceClient: process.env.EMAIL_CLIENT_ID,
      privateKey: process.env.EMAIL_PRIVATE_KEY,
    },
  });

  transporter.verify(function (error, success) {
    if (error) {
      return Promise.reject(error);
    }
  });

  const sentEmails = [];
  const failedEmails = [];


  for (const attendee of attendees) {
    if (Date.now() - startMs > 45000) {
      transporter.close();
      return [sentEmails, failedEmails];
    }

    const templatedHTML = template({
      event: "Gjenåpningsfesten",
      base_url: "billett.abakus.no",
      id: attendee.id,
      warning:
        "NB: før du får opp billetten din må du svare på samtykke til bilder. Gjør gjerne dette før selve eventet starter.",
    });

    const result = await transporter.sendMail({
      from: `A-blokka billettsystem <noreply@abakus.no>`,
      to: attendee.email,
      subject: `Billett til A-Blokka fest: Lørdag`,
      text: `Billetten din til Gjenåpningsfesten finner du på billett.abakus.no/${attendee.id}`,
      html: templatedHTML,
    });

    if ((result.accepted[0] as string).length > 0) {
      await prisma.attendees.update({
        where: {
          id: attendee.id,
        },
        data: {
          email_sent: true,
        },

      });
      sentEmails.push(attendee.email);
    } else {
      failedEmails.push(attendee.email);
    }
  }
  transporter.close();
  return [sentEmails, failedEmails];
};

export default sendTickets;
