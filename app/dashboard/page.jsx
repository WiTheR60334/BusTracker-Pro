"use client";
import React, { useEffect } from "react";
import styles from "./dashboard.module.css";
import Grid from "../../components/Grid/Grid";
import Info from "../../components/Info/Info";
import BasicTimeline from "../../components/BasicTimeline/BasicTimeline";
import BusDriverDetails from "../../components/BusDriverDetails/BusDriverDetails";
import SkipMyHouse from "../../components/SkipMyHouse/SkipMyHouse";
import { useSession } from "next-auth/react";
import { message } from "antd";
import { useRouter } from "next/navigation";

function Dashboard() {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status !== "authenticated") {
      router.push("/");
      message.info("You need to login to access this page");
    }
  }, [status, router]);
  return (
    <>
      {status === "authenticated" ? (
        <div>
          {/* <div className={styles.adminPanel}>
            <Grid />
            <Info />
          </div> */}
          <div className={styles.userPanel}>
            <div className={styles.busTitle}>Bus Details : </div>
            <BasicTimeline />
            <div className={styles.busDriverTitle}>Skip My House: </div>
            <SkipMyHouse />
            <div className={styles.busDriverTitle}>Bus Driver Details : </div>
            <BusDriverDetails />
          </div>
        </div>
      ) : null}
    </>
  );
}

export default Dashboard;
