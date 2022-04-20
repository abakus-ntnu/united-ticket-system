import { withApiAuthRequired } from "@auth0/nextjs-auth0";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default withApiAuthRequired(async (req, res) => {
  const total = (
    await prisma.attendees.count({
      select: {
        _all: true,
        admitted: true,
      },
    })
  ).admitted;

  const last_ten_minutes = await prisma.attendees.count({
    where: {
      admitted: {
        gte: new Date(Date.now() - 10 * 60000),
      },
    },
  });

  res.send({
    code: 200,
    total: total,
    last_ten_minutes: last_ten_minutes,
  });
});
