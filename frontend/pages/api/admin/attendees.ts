import { withApiAuthRequired } from "@auth0/nextjs-auth0";
import { AttendantType } from "../../../../types/types";
import { PrismaClient } from "@prisma/client";
import validateAttendee from "../../../lib/validateAttendee";

const prisma = new PrismaClient();
export default withApiAuthRequired(async (req, res) => {
  switch (req.method) {
    case "GET": {
      try {
        res.send(await prisma.attendees.findMany());
      } catch (error) {
        console.error(error);
        res.send({ message: "Failed to get attendees", code: 500 });
      }
      break;
    }
    case "POST": {
      if (
        !req.body?.data ||
        !req.body.data.every((attendee: Partial<AttendantType>) =>
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
      break;
    }
    default: {
      res.send({ message: "not implmented", code: 404 });
    }
  }
});
