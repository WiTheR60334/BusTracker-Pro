"use client";
import React, { useEffect } from "react";
import styles from "./Notifications.module.css";
import Notification from "../../components/Notification/Notification";
import { useSession } from "next-auth/react";
import { message } from "antd";
import { useRouter } from "next/navigation";
import ProtectedRoute from "../protected/page";

function Notifications() {
  const { status } = useSession();
  const router = useRouter();

  return (
    <>
      <ProtectedRoute>
        <div className={styles.container}>
          <div className={styles.busTitle}>Notifications : </div>
          <Notification />
        </div>
      </ProtectedRoute>
    </>
  );
}

export default Notifications;
