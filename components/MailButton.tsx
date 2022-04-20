import { Loading, Button } from "@nextui-org/react";
import { VFC } from "react";
import useSWR from "swr";
import { AttendantType } from "../lib/types";
import fetcher from "../lib/fetcher";

const sendTickets = () => {
  fetcher(`/api/admin/send_emails`, {
    method: "POST",
  }).then((res) => console.log(res));
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
