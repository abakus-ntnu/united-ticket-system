import { Loading, Button } from "@nextui-org/react";
import { VFC } from "react";
import useSWR from "swr";
import { AttendantType } from "../../types/types";
import fetchWithToken from "../lib/fetchWithToken";

const sendTickets = () => {
  fetchWithToken(`${process.env.API_URL}/admin/attendees/send_emails`, {
    method: "POST",
  }).then((res) => console.log(res));
};

const MailButton: VFC = () => {
  const { data, error } = useSWR<AttendantType[]>(
    `${process.env.API_URL}/admin/attendees`,
    fetchWithToken
  );

  if (!data) {
    return <Loading />;
  }
  return <Button onClick={sendTickets}>Send ut billetter</Button>;
};

export default MailButton;
