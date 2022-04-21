import { Loading, Button } from "@nextui-org/react";
import { VFC } from "react";
import useSWR from "swr";
import { AttendantType } from "../lib/types";
import fetcher from "../lib/fetcher";

const sendTickets = async (attendees: AttendantType[]) => {
  let errorCount = 0;
  for (const attendee of attendees) {
    const result = await fetcher(`/api/admin/send_email`, {
      method: "POST",
      body: JSON.stringify({
        id: attendee.id,
      }),
    });

    if (result.code !== 200) {
      errorCount++;
    }
    console.log(result);
  }
  console.log("All requests completed. Error count: ", errorCount);
};

const MailButton: VFC = () => {
  const { data, error } = useSWR<AttendantType[]>(
    `/api/admin/attendees`,
    fetcher
  );

  if (!data) {
    return <Loading />;
  }
  return (
    <Button
      onClick={() =>
        sendTickets(
          data?.filter(
            (attendee) =>
              attendee.email_sent === false && attendee.active === true
          )
        )
      }
    >
      Send ut billetter
    </Button>
  );
};

export default MailButton;
