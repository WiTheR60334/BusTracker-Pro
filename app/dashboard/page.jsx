"use client";
import React, { useEffect, useState } from "react";
import styles from "./dashboard.module.css";
import Grid from "../../components/Grid/Grid";
import Info from "../../components/Info/Info";
import BasicTimeline from "../../components/BasicTimeline/BasicTimeline";
import BusDriverDetails from "../../components/BusDriverDetails/BusDriverDetails";
import SkipMyHouse from "../../components/SkipMyHouse/SkipMyHouse";
import { useSession } from "next-auth/react";
import { message } from "antd";
import { useRouter } from "next/navigation";
import ProtectedRoute from "../protected/page";
import AdminProtectedRoute from "../adminprotected/page";
import StudentProtectedRoute from "../studentprotected/page";

function Dashboard() {
  const { status } = useSession();
  const router = useRouter();

  return (
    <>
      <ProtectedRoute>
        <div>
          <AdminProtectedRoute>
            <div className={styles.adminPanel}>
              <Grid />
              <Info />
            </div>
            <div className={styles.userPanel}>
              <div className={styles.busTitle}>Bus Details : </div>
              <BasicTimeline />
              <div className={styles.busDriverTitle}>Bus Driver Details : </div>
              <BusDriverDetails />
            </div>
          </AdminProtectedRoute>
          <StudentProtectedRoute>
            <div className={styles.userPanel}>
              <div className={styles.busTitle}>Bus Details : </div>
              <BasicTimeline />
              <div className={styles.busDriverTitle}>Skip My House: </div>
              <SkipMyHouse />
              <div className={styles.busDriverTitle}>Bus Driver Details : </div>
              <BusDriverDetails />
            </div>
          </StudentProtectedRoute>
        </div>
      </ProtectedRoute>
    </>
  );
}

export default Dashboard;
