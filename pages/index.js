import Head from "next/head";
import SideNavbar from "../components/SideNavbar";
import styles from "./index.module.css";
import Grid from "../components/Grids/Grid";

export default function Home() {
  return (
    <div className={styles.main}>
      <div className={styles.sidebar}>
        <div className="bg-blue-800">
          <Head>
            <title>Responsive Side-Navbar</title>
            <meta name="description" content="Generated by create next app" />
            <link rel="icon" href="/pro.ico" />
          </Head>
          <SideNavbar />
        </div>
      </div>
      
      <div className={styles.rest}>
        <div className={styles.title}>
          Bus Tracker Pro
        </div>
        <div className={styles.dock}>
          <Grid />
        </div>
      </div>
    </div>
  );
}
