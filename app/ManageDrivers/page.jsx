"use client";
import React, { useEffect } from "react";
import { useSession } from "next-auth/react";
import { message } from "antd";
import { useRouter } from "next/navigation";
import ProtectedRoute from "../protected/page";
import AdminProtectedRoute from "../adminprotected/page";
import StudentProtectedRoute from "../studentprotected/page";

function ManageDrivers() {
  const { status } = useSession();
  const router = useRouter();

  return (
    <>
      <ProtectedRoute>
        <AdminProtectedRoute>
          <div>ManageDrivers</div>
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
