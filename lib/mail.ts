import { Attendees } from "@prisma/client";
import nodemailer from "nodemailer";
import handlebars from "handlebars";
import mailTemplate from "./mailTemplate";

const sendTicket = async (attendee: Attendees) => {
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

  const templatedHTML = template({
    event: "Gjenåpningsfesten",
    base_url: "billett.abakus.no",
    id: attendee.id,
    warning:
      "NB: før du får opp billetten din må du svare på samtykke til bilder. Gjør gjerne dette før selve eventet starter.",
  });

  return await transporter.sendMail({
    from: `A-blokka billettsystem <noreply@abakus.no>`,
    to: attendee.email,
    subject: `Billett`,
    text: `Billetten din til Gjenåpningsfesten finner du på billett.abakus.no/${attendee.id}`,
    html: templatedHTML,
  });
};

export default sendTicket;
