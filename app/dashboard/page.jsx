import React from "react";
import styles from "./dashboard.module.css";
import Grid from "../../components/Grid/Grid";
import Info from "../../components/Info/Info";
import BasicTimeline from "../../components/BasicTimeline/BasicTimeline";
import BusDriverDetails from "../../components/BusDriverDetails/BusDriverDetails";

function Dashboard() {
  return (
    <div>
      {/* <div className={styles.adminPanel}>
        <Grid />
        <Info />
      </div> */}
      <div className={styles.userPanel}>
        <div className={styles.busTitle}>Bus Details : </div>
        <BasicTimeline />
        <div className={styles.busDriverTitle}>Bus Driver Details : </div>
        <BusDriverDetails />
      </div>
    </div>
  );
}

export default Dashboard;
