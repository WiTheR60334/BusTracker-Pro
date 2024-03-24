"use client";
import React, { useEffect } from "react";
import styles from "./ManageBuses.module.css";
import { FaBus } from "react-icons/fa";
import Table2 from "../../components/Table2/Table2";
import Table from "../../components/Table/Table";
import { useSession } from "next-auth/react";
import { message } from "antd";
import { useRouter } from "next/navigation";
import ProtectedRoute from "../protected/page";

function ManageBuses() {
  const { status } = useSession();
  const router = useRouter();

  return (
    <>
      <ProtectedRoute>
        <div className={styles.container}>
          <div className={styles.box}>
            <div className={styles.title}>
              <FaBus
                style={{
                  color: "#235ff4",
                  fontSize: "18px",
                  marginRight: "8px",
                }}
              />
              Manage Buses
              <div style={{ marginTop: "2rem" }}>
                <Table2 />
                {/* <Table /> */}
              </div>
            </div>
          </div>
        </div>
      </ProtectedRoute>
    </>
  );
}

export default ManageBuses;
