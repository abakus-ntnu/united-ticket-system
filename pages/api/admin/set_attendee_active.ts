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
    return res.send({ code: 404, message: "Attendee does not exist" });
  }

  try {
    const updatedAttendee = await prisma.attendees.update({
      where: {
        id: req.body.id,
      },
      data: {
        active: req.body.active,
      },
    });

    res.send({ message: updatedAttendee, code: 200 });
  } catch (e) {
    console.error(e);
    res.send({
      message: "Failed to set active status for attendee",
      code: 500,
    });
  }
});
