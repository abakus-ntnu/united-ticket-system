import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const AttendeeID = async (req: NextApiRequest, res: NextApiResponse) => {
  const attendeeID = req.query.attendeeID as string;

  try {
    const attendee = await prisma.attendees.findUnique({
      where: {
        id: attendeeID,
      },
    });
    if (attendee == null) {
      return res.send({ message: "Attendee does not exist", code: 404 });
    }

    if (!attendee.active) {
      return res.send({ message: "Not active", code: 403 });
    }

    if (attendee.admitted != null) {
      return res.send({ message: "Already admitted", code: 403 });
    }

    res.send({ message: attendee, code: 200 });
  } catch (e) {
    console.error(e);
    res.send({ message: "Could not get attendee", code: 500 });
  }
};

export default AttendeeID;
