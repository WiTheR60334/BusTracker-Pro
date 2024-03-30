"use client";
import styles from "./ManageStudents.module.css";
import { PiStudentBold } from "react-icons/pi";
import ManageStudentss from "../../components/ManageStudentss/ManageStudentss";
import React, { useEffect } from "react";
import { useSession } from "next-auth/react";
import { message } from "antd";
import { useRouter } from "next/navigation";
import ProtectedRoute from "../protected/page";
import AdminProtectedRoute from "../adminprotected/page";
import StudentProtectedRoute from "../studentprotected/page";

function ManageStudents() {
  const { status } = useSession();
  const router = useRouter();

  return (
    <>
      <ProtectedRoute>
        <AdminProtectedRoute>
          <div className={styles.container}>
            <div className={styles.box}>
              <div className={styles.title}>
                <div className={styles.titlebar}>
                  <PiStudentBold
                    style={{
                      color: "#235ff4",
                      fontSize: "21px",
                      marginRight: "8px",
                      display: "flex",
                    }}
                  />
                  <div style={{ display: "flex" }}>Manage Students</div>
                </div>
                <div style={{ marginTop: "2rem" }}>
                  <ManageStudentss />
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

export default ManageStudents;
