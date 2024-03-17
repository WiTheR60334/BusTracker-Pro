"use client";
import { Disclosure } from "@headlessui/react";
import Link from "next/link";
import { React, useState, useEffect } from "react";
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
import { Popconfirm, message } from "antd";
import { useRouter } from "next/navigation";
import styles from "./Sidebar.module.css";
import { on } from "events";

function Sidebar({ onLinkClick }) {
  const [marginLeft, setMarginLeft] = useState("-2px");
  const router = useRouter();
  const handleLogout = () => {
    console.log("Logging out...");
    router.push("/");
  };
  const confirmLogout = () => {
    onLinkClick();
    message.success("You have successfully logged out.");
    handleLogout();
  };

  const cancelLogout = () => {
    message.info("Cancelled logout.");
  };

  useEffect(() => {
    function updateMarginLeft() {
      const windowWidth = window.innerWidth;
      setMarginLeft(windowWidth < 351 ? "-15px" : "-2px");
    }

    updateMarginLeft();

    window.addEventListener("resize", updateMarginLeft);

    return () => window.removeEventListener("resize", updateMarginLeft);
  }, []);

  return (
    <div className={styles.container}>
      <Link href="/" style={{ color: "inherit", textDecoration: "none" }}>
        <div className={styles.logo}>Logo</div>
      </Link>
      <div className={styles.content}>
        <Link
          href="/dashboard"
          style={{ color: "inherit", textDecoration: "none" }}
          onClick={onLinkClick}
        >
          <div className={styles.item}>
            <MdOutlineSpaceDashboard
              style={{
                color: "#235ff4",
                fontSize: "23px",
                marginRight: "8px",
                marginLeft: parseInt(marginLeft) - 2,
              }}
            />
            {"   "}
            Dashboard
          </div>
        </Link>
        <Link
          href="/ManageBuses"
          style={{ color: "inherit", textDecoration: "none" }}
          onClick={onLinkClick}
        >
          <div className={styles.item}>
            <FaBus
              style={{
                color: "#235ff4",
                fontSize: "18px",
                marginRight: "10px",
                marginLeft: marginLeft,
              }}
            />
            Manage Buses
          </div>
        </Link>
        <Link
          href="/ManageDrivers"
          style={{ color: "inherit", textDecoration: "none" }}
          onClick={onLinkClick}
        >
          <div className={styles.item}>
            <FaUser
              style={{
                color: "#235ff4",
                fontSize: "18px",
                marginRight: "10px",
                marginLeft: marginLeft,
              }}
            />
            Manage Drivers
          </div>
        </Link>
        <Link
          href="/ManageStudents"
          style={{ color: "inherit", textDecoration: "none" }}
          onClick={onLinkClick}
        >
          <div className={styles.item}>
            <PiStudentBold
              style={{
                color: "#235ff4",
                fontSize: "20px",
                marginRight: "8px",
                marginLeft: marginLeft,
              }}
            />
            Manage Students
          </div>
        </Link>
        <Link
          href="/SetRoutes"
          style={{ color: "inherit", textDecoration: "none" }}
          onClick={onLinkClick}
        >
          <div className={styles.item}>
            <FaRoute
              style={{
                color: "#235ff4",
                fontSize: "18px",
                marginRight: "10px",
                marginLeft: marginLeft,
              }}
            />
            Set Routes
          </div>
        </Link>
        <Popconfirm
          title="Are you sure you want to log out?"
          onConfirm={confirmLogout}
          onCancel={cancelLogout}
          okText="Yes"
          cancelText="No"
        >
          <div className={styles.item}>
            <MdLogout
              icon="fas fa-sign-out-alt"
              style={{
                fontWeight: "bolder",
                color: "#235ff4",
                fontSize: "20px",
                marginRight: "10px",
                marginLeft: marginLeft,
              }}
            />
            Log Out
          </div>
        </Popconfirm>
        {/* <Link
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
                marginLeft: marginLeft,
              }}
            />
            Log Out
          </div>
        </Link> */}
      </div>
    </div>
  );
}

export default Sidebar;
