import React from "react";
import styles from "./Notifications.module.css";
import Notification from "../../components/Notification/Notification";

function Notifications() {
  return (
    <div className={styles.container}>
      <div className={styles.busTitle}>Notifications : </div>
      <Notification />
    </div>
  );
}

export default Notifications;
