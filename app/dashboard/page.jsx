import React from "react";
import styles from "./dashboard.module.css";
import Grid from "../../components/Grid/Grid";
import Info from "../../components/Info/Info";
import BasicTimeline from "../../components/BasicTimeline/BasicTimeline";

function Dashboard() {
  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: "4rem",
        }}
      >
        {/* <Grid />
        <Info /> */}
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          // marginTop: "2rem",
          width: "100%",
        }}
      >
        <BasicTimeline />
        {/* </div> */}
      </div>
    </div>
  );
}

export default Dashboard;
