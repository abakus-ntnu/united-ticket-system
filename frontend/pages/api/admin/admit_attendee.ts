import { withApiAuthRequired } from "@auth0/nextjs-auth0";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default withApiAuthRequired(async (req, res) => {
  const attendee = await prisma.attendees.findUnique({
    where: {
      id: req.body.id,
    },
  });
  if (attendee == null) {
    return res.send({ code: 404, message: attendee });
  }
  if (!attendee.active) {
    return res.send({ code: 403, message: attendee });
  }

  if (attendee.admitted != null) {
    return res.send({ code: 403, message: attendee });
  }

  try {
    const updatedAttendee = await prisma.attendees.update({
      where: {
        id: attendee.id,
      },
      data: {
        admitted: new Date(),
      },
    });

    res.send({ message: updatedAttendee, code: 200 });
  } catch (e) {
    console.error(e);
    res.send({ message: "Failed to admit attendee", code: 500 });
  }
});
