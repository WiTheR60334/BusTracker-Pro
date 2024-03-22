"use client";
import React from "react";
import { Popconfirm, message } from "antd";
import styles from "./SkipMyHouse.module.css";

function SkipMyHouse() {
  const confirmLogout = () => {
    message.success("Your house has been successfully skipped.");
  };

  const cancelLogout = () => {
    message.info("Cancelled process.");
  };
  return (
    <div className={styles.container}>
      <div className={styles.box}>
        If you are not going to come to school, then write a leave application
        and click on the below button to skip your house :
        <textarea
          name="message"
          placeholder="write your leave application here"
          className={styles.textarea}
        ></textarea>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Popconfirm
            title="Are you sure you want to skip your house?"
            onConfirm={confirmLogout}
            onCancel={cancelLogout}
            okText="Yes"
            cancelText="No"
          >
            <button className={styles.button}>Skip My House</button>
          </Popconfirm>
        </div>
      </div>
    </div>
  );
}

export default SkipMyHouse;
