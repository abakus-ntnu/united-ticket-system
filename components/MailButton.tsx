import { Loading, Button } from "@nextui-org/react";
import { VFC } from "react";
import useSWR from "swr";
import { AttendantType } from "../lib/types";
import fetcher from "../lib/fetcher";

const sendTickets = async () => {
  const result = await fetcher(`/api/admin/send_emails`, {
    method: "POST",
  });

  console.log(result);
};

const MailButton: VFC = () => {
  const { data, error } = useSWR<AttendantType[]>(
    `/api/admin/attendees`,
    fetcher
  );

  if (!data) {
    return <Loading />;
  }

  return <Button onClick={sendTickets}>Send ut billetter</Button>;
};

export default MailButton;
