import { Attendees } from "@prisma/client";
import nodemailer from "nodemailer";
import * as fs from "fs";
import * as path from "path";
import * as handlebars from "handlebars";

const sendTickets = async (attendees: Array<Attendees>) => {
  const html = fs.readFileSync(
    path.resolve(__dirname, "./template.html"),
    "utf8"
  );
  const template = handlebars.compile(html);

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      type: "OAuth2",
      user: "noreply@abakus.no",
      serviceClient: process.env.client_id,
      privateKey: process.env.private_key,
    },
  });
  transporter.verify(function (error, success) {
    if (error) {
      console.log("SMTP connection error", error); // eslint-disable-line no-console
    } else {
      console.log("SMTP connection success", success); // eslint-disable-line no-console
    }
  });

  await Promise.all(
    attendees.map((attendee) => {
      const templatedHTML = template({
        event: "Gjenåpningsfesten",
        base_url: "billett.abakus.no",
        id: attendee.id,
        warning:
          "NB: før du får opp billetten din må du svare på samtykke til bilder. Gjør gjerne dette før selve eventet starter.",
      });

      return transporter.sendMail({
        from: `A-blokka billettsystem <noreply@abakus.no>`,
        to: attendee.email,
        subject: `Billett`,
        text: `Billetten din til Gjenåpningsfesten finner du på billett.abakus.no/${attendee.id}`,
        html: templatedHTML,
      });
    })
  );
};

export default sendTickets;
