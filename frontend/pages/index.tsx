import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Billettsystem</title>
      </Head>
      <main className={styles.main}>
        Velkommen til billettsystem-sida!
        <br />
        Route til en underside for content;)
      </main>
    </div>
  );
};

export default Home;
