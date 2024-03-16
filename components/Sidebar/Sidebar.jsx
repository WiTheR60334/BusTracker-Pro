import React from "react";
import styles from "./Sidebar.module.css";
import Link from "next/link";

function Sidebar() {
  return (
    <div className={styles.container}>
      <div className={styles.logo}>Logo</div>
      <div className={styles.content}>
        <Link href="/dashboard">
          <div className={styles.item}>Dashboard</div>
        </Link>

        <div className={styles.item}>Dashboard</div>
        <div className={styles.item}>Dashboard</div>
        <div className={styles.item}>Dashboard</div>
        <div className={styles.item}>Dashboard</div>
      </div>
    </div>
  );
}

export default Sidebar;
