import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import GdprComponent from "../../components/Gdpr";
import TicketComponent from "../../components/Ticket";
import styles from "../styles/Home.module.css";

const ticketPage: NextPage = () => {
  return (
    <div>
      <GdprComponent>
        <TicketComponent></TicketComponent>
      </GdprComponent>
    </div>
  );
};

export default ticketPage;
