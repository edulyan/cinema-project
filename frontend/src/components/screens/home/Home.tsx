import Layout from "@/components/layout/Layout";
import { FC } from "react";
import styles from "./Home.module.css";

const Home: FC = () => {
  return (
    <Layout>
      <div className={styles.home}>
        <h1 className={styles.title}>Home</h1>
      </div>
    </Layout>
  );
};

export default Home;
