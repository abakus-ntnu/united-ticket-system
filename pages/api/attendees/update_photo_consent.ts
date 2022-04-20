import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const UpdatePhotoConsent = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const attendee = await prisma.attendees.update({
      where: {
        id: req.body.id,
      },
      data: {
        photo_consent: req.body.consent,
      },
    });
    res.send({ message: attendee, code: 200 });
  } catch (e) {
    console.error(e);
    res.send({ message: "Could not update attendee photo_consent", code: 500 });
  }
};

export default UpdatePhotoConsent;
