"use client";
import React, { useEffect } from "react";
import styles from "./Notifications.module.css";
import Notification from "../../components/Notification/Notification";
import { useSession } from "next-auth/react";
import { message } from "antd";
import { useRouter } from "next/navigation";

function Notifications() {
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
        <div className={styles.container}>
          <div className={styles.busTitle}>Notifications : </div>
          <Notification />
        </div>
      ) : null}
    </>
  );
}

export default Notifications;
