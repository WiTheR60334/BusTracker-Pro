import React from "react";
import styles from "./Sidebar.module.css";
import Link from "next/link";

function Sidebar() {
  return (
    <div className={styles.container}>
      <div className={styles.logo}>Logo</div>
      <div className={styles.content}>
        <Link href="/dashboard" style={{ color: "inherit", textDecoration: "none" }}>
          <div className={styles.item}>Dashboard</div>
        </Link>
        <Link
          href="/ManageBuses"
          style={{ color: "inherit", textDecoration: "none" }}
        >
          <div className={styles.item}>Manage Buses</div>
        </Link>
        <Link
          href="/ManageDrivers"
          style={{ color: "inherit", textDecoration: "none" }}
        >
          <div className={styles.item}>Manage Drivers</div>
        </Link>
        <Link
          href="/ManageStudents"
          style={{ color: "inherit", textDecoration: "none" }}
        >
          <div className={styles.item}>Manage Students</div>
        </Link>
        <Link
          href="/SetRoutes"
          style={{ color: "inherit", textDecoration: "none" }}
        >
          <div className={styles.item}>Set Routes</div>
        </Link>
      </div>
    </div>
  );
}

export default Sidebar;
