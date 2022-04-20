import GdprComponent from "../components/Gdpr";
import TicketComponent from "../components/Ticket";
import { AttendantType } from "../lib/types";
import fetcher from "../lib/fetcher";

export async function getServerSideProps({ query }: { query: any }) {
  const response = await fetcher(
    `${process.env.AUTH0_BASE_URL}/api/attendees/${query.ticketId}`
  );
  return {
    props: {
      data: response,
    },
  };
}

const getStatus = (data: {
  message: AttendantType | string;
  code: number;
}): string | null => {
  if (data.code === 200) {
    return null;
  }

  if (data.code === 404) {
    return "Billetten din eksisterer ikke";
  }

  if (data.message === "Not active") {
    return "Billetten din er ikke aktiv";
  }

  if (data.message === "Already admitted") {
    return "Billetten din er allerede brukt";
  }

  return "Ooops. Her skjedde det en feil. Ta kontakt med arrangøren.";
};

const getTicket = (message: AttendantType | string) =>
  typeof message === "string" ? null : (message as AttendantType);

const needsToConsent = (ticket: AttendantType | null) =>
  ticket?.photo_consent === null;

const TicketPage = ({
  data,
}: {
  data: { message: AttendantType | string; code: number };
}) => {
  const ticket = getTicket(data.message);
  const status = getStatus(data);

  return (
    <div>
      {needsToConsent(ticket) ? (
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
