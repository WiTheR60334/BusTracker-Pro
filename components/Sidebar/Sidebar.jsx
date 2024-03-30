"use client";
import Link from "next/link";
import ProtectedRoute from "../../app/protected/page";
import { signIn, signOut, useSession } from "next-auth/react";
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
import { IoNotificationsSharp } from "react-icons/io5";
import Box from "@mui/material/Box";
import Badge from "@mui/material/Badge";
import { BorderTopOutlined } from "@ant-design/icons";
import { Button, notification, Space } from "antd";
import AdminProtectedRoute from "../../app/adminprotected/page";
import styles from "./Sidebar.module.css";

function Sidebar({ onLinkClick }) {
  const [marginLeft, setMarginLeft] = useState("-2px");
  const [showCloseIcon, setShowCloseIcon] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [api, contextHolder] = notification.useNotification();
  const openNotification = (placement) => {
    api.info({
      // message: `Notification ${placement}`,
      message:
        "Bus No 1234 has reached your location. Please be ready to board the bus.",
      // description:
      //   "Bus No 1234 has reached your location. Please be ready to board the bus.",
      placement,
    });
  };

  const onClick = () => {
    setIsClicked(true);
  };

  const closeSidebar = () => {
    onLinkClick();
    handleLogout(false);
  };

  const handleLogout = (redirect = true) => {
    if (redirect) {
      signOut({ callbackUrl: "/" });
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
    <>
      {/* <ProtectedRoute /> */}
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
          {contextHolder}
          <Link
            href="/Notifications"
            style={{ color: "inherit", textDecoration: "none" }}
            onClick={() => {
              onLinkClick();
              openNotification("top");
            }}
          >
            <div className={styles.item} onClick={onClick}>
              <Box
                sx={{ color: "action.active" }}
                style={{ marginRight: "2px" }}
              >
                {isClicked ? (
                  <Badge
                    color="error"
                    overlap="circular"
                    anchorOrigin={{ vertical: "top", horizontal: "right" }}
                  >
                    <IoNotificationsSharp
                      style={{
                        color: "#235ff4",
                        fontSize: "23px",
                        marginRight: "8px",
                        marginLeft: "-5px",
                      }}
                    />
                  </Badge>
                ) : (
                  <Badge
                    color="error"
                    overlap="circular"
                    anchorOrigin={{ vertical: "top", horizontal: "right" }}
                    style={{ marginRight: "5px" }}
                    variant="dot"
                  >
                    <IoNotificationsSharp
                      style={{
                        color: "#235ff4",
                        fontSize: "23px",
                        marginRight: "8px",
                        marginLeft: "-5px",
                      }}
                    />
                  </Badge>
                )}
              </Box>
              {"   "}
              Notifications
            </div>
          </Link>
          <AdminProtectedRoute>
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
          </AdminProtectedRoute>
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
      {/* ) : ( */}
      {/* <div
          style={{
            color: "inherit",
            textDecoration: "none",
            marginTop: "2rem",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
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
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "80%",
              height: "100%",
            }}
          >
            Login in AU credentials only, to access the app
          </div>
        </div> */}
      {/* )} */}
      {/* </ProtectedRoute> */}
    </>
  );
}

export default Sidebar;
