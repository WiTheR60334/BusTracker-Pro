import React from "react";
import Grid from "../../components/Grid/Grid";
import Info from "../../components/Info/Info";

function Dashboard() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Grid />
      <Info />
    </div>
  );
}

export default Dashboard;
