import React from "react";
import styles from "./ManageBuses.module.css";
import { FaBus } from "react-icons/fa";
import Table from "../../components/Table/Table";

function ManageBuses() {
  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <div className={styles.title}>
          <FaBus
            style={{ color: "#235ff4", fontSize: "18px", marginRight: "8px" }}
          />
          Manage Buses
          <div>
            <Table />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ManageBuses;
