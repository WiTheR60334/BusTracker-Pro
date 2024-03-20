import React from "react";
import { FaBus } from "react-icons/fa";
import styles from "./Notification.module.css";

function Notification() {
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div className={styles.container}>
        <div className={styles.box}>
          <div className={styles.avatar}>
            <FaBus
              style={{ fontSize: "25px", color: "blue", marginTop: ".5rem" }}
            />
          </div>
          <div className={styles.details}>
            <div style={{ marginBottom: "1rem", fontSize: "14px" }}>
              Bus No 1234 has reached your location
            </div>
            <div style={{ marginBottom: "0.7rem", fontSize: "12px" }}>
              1s ago
            </div>
          </div>
        </div>
      </div>

      <div className={styles.container}>
        <div className={styles.box}>
          <div className={styles.avatar}>
            <FaBus
              style={{ fontSize: "25px", color: "blue", marginTop: ".5rem" }}
            />
          </div>
          <div className={styles.details}>
            <div style={{ marginBottom: "1rem", fontSize: "14px" }}>
              Hey ! Bus No 1234 is just 1km away from you
            </div>
            <div style={{ marginBottom: ".7rem", fontSize: "12px" }}>
              5m ago
            </div>
          </div>
        </div>
      </div>

      <div className={styles.container}>
        <div className={styles.box}>
          <div className={styles.avatar}>
            <FaBus
              style={{ fontSize: "25px", color: "blue", marginTop: ".5rem" }}
            />
          </div>
          <div className={styles.details}>
            <div style={{ marginBottom: "1rem", fontSize: "14px" }}>
              Bus No 1234 is cancelled due to some technical issues
            </div>
            <div style={{ marginBottom: ".7rem", fontSize: "12px" }}>
              1d ago
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Notification;
