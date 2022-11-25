import type { NextPage } from "next";
import Head from "next/head";
import { Connect4 } from "../features/board/Board";

import Counter from "../features/counter/Counter";
import styles from "../styles/Home.module.css";

const IndexPage: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Connect4</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Connect4 />
    </div>
  );
};

export default IndexPage;
