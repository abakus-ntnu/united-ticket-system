import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import GdprComponent from "../../components/Gdpr";
import TicketComponent from "../../components/Ticket";
import { AttendantType } from "../../../types/types";
import { Loading } from "@nextui-org/react";

const TicketPage: NextPage = () => {
  const router = useRouter();
  const [ticket, setTicket] = useState<AttendantType>();
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const ticketId = router.query.ticketId;
    fetch(`${process.env.API_URL}/attendees/${ticketId}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.code === 200) {
          setTicket(data.message);
        } else if (data.code === 404) {
          setStatus("Billetten din eksisterer ikke");
        } else if (data.message === "Not active") {
          setStatus("Billetten din er ikke aktiv");
        } else if (data.message === "Already admitted") {
          setStatus("Billetten din er allerede brukt");
        } else if (data.code === 500) {
          setStatus(
            "Ooops. Her skjedde det en feil. Ta kontakt med arrangøren."
          );
        }
        setLoading(false);
      });
  }, [router]);
  if (loading) {
    return <Loading />;
  }
  return (
    <div>
      {ticket?.photo_consent === null ? (
        <GdprComponent>
          <TicketComponent ticket={ticket} status={status}></TicketComponent>
        </GdprComponent>
      ) : (
        <TicketComponent ticket={ticket} status={status}></TicketComponent>
      )}
    </div>
  );
};

export default TicketPage;
