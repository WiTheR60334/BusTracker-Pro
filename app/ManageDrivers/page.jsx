"use client";
import React, { useEffect } from "react";
import { useSession } from "next-auth/react";
import { message } from "antd";
import { useRouter } from "next/navigation";
import styles from "./ManageDrivers.module.css";
import ManageDriver from "../../components/ManageDrivers/ManageDrivers";
import ProtectedRoute from "../protected/page";
import AdminProtectedRoute from "../adminprotected/page";
import StudentProtectedRoute from "../studentprotected/page";
import { FaRoute} from "react-icons/fa";



function ManageDrivers() {
  const { status } = useSession();
  const router = useRouter();

  return (
    <>
      <ProtectedRoute>
        <AdminProtectedRoute>
          <div className={styles.container}>
            <div className={styles.box}>
              <div className={styles.title}>
                <FaRoute
                  style={{
                    color: "#235ff4",
                    fontSize: "18px",
                    marginRight: "8px",
                  }}
                />
                Manage Driver
                <div style={{ marginTop: "2rem" }}>
                  <ManageDriver />
                </div>
              </div>
            </div>
          </div>
        </AdminProtectedRoute>
        <StudentProtectedRoute>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            You need to be admin to access this page
          </div>
        </StudentProtectedRoute>
      </ProtectedRoute>
    </>
  );
}

export default ManageDrivers;
