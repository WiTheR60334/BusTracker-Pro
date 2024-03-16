import React from "react";
import styles from "./Sidebar.module.css";
import Link from "next/link";
import { GiHamburgerMenu } from "react-icons/gi";
import { Disclosure } from "@headlessui/react";
import {
  MdOutlineSpaceDashboard,
  MdOutlineSettings,
  MdOutlineLogout,
} from "react-icons/md";
import { FaBus, FaRoute, FaUser } from "react-icons/fa";
import { PiStudentBold } from "react-icons/pi";
import { CgProfile } from "react-icons/cg";

function Sidebar() {
  return (
    <div className={styles.container}>
      <div className={styles.logo}>Logo</div>
      <div className={styles.content}>
        <Link
          href="/dashboard"
          style={{ color: "inherit", textDecoration: "none" }}
        >
          <div className={styles.item}>
            <MdOutlineSpaceDashboard
              style={{ color: "#235ff4", fontSize: "23px", marginRight: "8px" }}
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
              style={{ color: "#235ff4", fontSize: "18px", marginRight: "8px" }}
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
              style={{ color: "#235ff4", fontSize: "18px", marginRight: "8px" }}
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
              style={{ color: "#235ff4", fontSize: "23px", marginRight: "8px" }}
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
              style={{ color: "#235ff4", fontSize: "18px", marginRight: "8px" }}
            />
            Set Routes
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Sidebar;
