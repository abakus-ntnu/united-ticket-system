import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useUser } from "@auth0/nextjs-auth0";
import { useEffect } from "react";
import { useRouter } from "next/router";

const Home = () => {
  const user = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!user.isLoading && user.user) {
      router.push("/admin");
    }
  }, [user, router]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Billettsystem</title>
      </Head>
      <main className={styles.main}>
        Velkommen til billettsystem-sida! Gå til /admin hvis du vet hva du
        holder på med:)
        <br />
      </main>
    </div>
  );
};

export default Home;
