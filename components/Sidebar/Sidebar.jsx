"use client"
import { Disclosure } from "@headlessui/react";
import Link from "next/link";
import {React,useState} from "react";
import { CgProfile } from "react-icons/cg";
import { FaBus, FaRoute, FaUser } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import {
  MdOutlineLogout,
  MdOutlineSettings,
  MdOutlineSpaceDashboard,
} from "react-icons/md";
import { PiStudentBold } from "react-icons/pi";
import { MdLogout } from "react-icons/md";
import styles from "./Sidebar.module.css";

function Sidebar() {
  return (
    <div className={styles.container}>
      <Link href="/" style={{ color: "inherit", textDecoration: "none" }}>
        <div className={styles.logo}>Logo</div>
      </Link>
      <div className={styles.content}>
        <Link
          href="/dashboard"
          style={{ color: "inherit", textDecoration: "none" }}
        >
          <div className={styles.item}>
            <MdOutlineSpaceDashboard
              style={{
                color: "#235ff4",
                fontSize: "20px",
                marginRight: "9px",
                marginLeft: "-2px",
              }}
            />
            {"   "}
            Dashboard
          </div>
        </Link>
        <Link
          href="/ManageBuses"
          style={{ color: "inherit", textDecoration: "none" }}
        >
          <div className={styles.item}>
            <FaBus
              style={{
                color: "#235ff4",
                fontSize: "18px",
                marginRight: "10px",
              }}
            />
            Manage Buses
          </div>
        </Link>
        <Link
          href="/ManageDrivers"
          style={{ color: "inherit", textDecoration: "none" }}
        >
          <div className={styles.item}>
            <FaUser
              style={{
                color: "#235ff4",
                fontSize: "18px",
                marginRight: "10px",
              }}
            />
            Manage Drivers
          </div>
        </Link>
        <Link
          href="/ManageStudents"
          style={{ color: "inherit", textDecoration: "none" }}
        >
          <div className={styles.item}>
            <PiStudentBold
              style={{
                color: "#235ff4",
                fontSize: "20px",
                marginRight: "8px",
              }}
            />
            Manage Students
          </div>
        </Link>
        <Link
          href="/SetRoutes"
          style={{ color: "inherit", textDecoration: "none" }}
        >
          <div className={styles.item}>
            <FaRoute
              style={{
                color: "#235ff4",
                fontSize: "18px",
                marginRight: "10px",
              }}
            />
            Set Routes
          </div>
        </Link>
        <Link
          href="/SetRoutes"
          style={{ color: "inherit", textDecoration: "none" }}
        >
          <div className={styles.item}>
            <MdLogout
              icon="fas fa-sign-out-alt"
              style={{
                fontWeight: "bolder",
                color: "#235ff4",
                fontSize: "20px",
                marginRight: "10px",
              }}
            />
            Log Out
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Sidebar;
