"use client";
import Link from "next/link";
import { React, useState, useEffect } from "react";
import { FaBus, FaRoute, FaUser } from "react-icons/fa";
import {
  MdOutlineLogout,
  MdOutlineSettings,
  MdOutlineSpaceDashboard,
} from "react-icons/md";
import { PiStudentBold } from "react-icons/pi";
import { MdLogout } from "react-icons/md";
import { Popconfirm, message } from "antd";
import { IoCloseSharp } from "react-icons/io5";
import { useRouter } from "next/navigation";
import { FaUserCircle } from "react-icons/fa";
import styles from "./Sidebar.module.css";

function Sidebar({ onLinkClick }) {
  const [marginLeft, setMarginLeft] = useState("-2px");
  const [showCloseIcon, setShowCloseIcon] = useState(false);
  const router = useRouter();
  const closeSidebar = () => {
    onLinkClick();
    handleLogout(false);
  };

  const handleLogout = (redirect = true) => {
    console.log("Logging out...");
    if (redirect) {
      router.push("/");
    }
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
    function handleResize() {
      const windowWidth = window.innerWidth;
      setShowCloseIcon(windowWidth < 769);
    }

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
      <div style={{ color: "inherit", textDecoration: "none" }}>
        <div className={styles.logo}>
          <span style={{ flex: 1, textAlign: "center" }}>Logo</span>
          {showCloseIcon && (
            <IoCloseSharp
              style={{
                fontSize: "25px",
                alignSelf: "center",
                marginRight: "15px",
              }}
              onClick={closeSidebar}
            />
          )}
        </div>
      </div>
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
        <Link
          href="/Profile"
          style={{ color: "inherit", textDecoration: "none" }}
          onClick={onLinkClick}
        >
          <div className={styles.item}>
            <FaUserCircle
              style={{
                color: "#235ff4",
                fontSize: "20px",
                marginRight: "10px",
                marginLeft: marginLeft,
              }}
            />
            Profile
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
