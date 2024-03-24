"use client";
import React, { useEffect } from "react";
import { useSession } from "next-auth/react";
import { message } from "antd";
import { useRouter } from "next/navigation";
import ProtectedRoute from "../protected/page";

function ManageDrivers() {
  const { status } = useSession();
  const router = useRouter();

  return (
    <>
      <ProtectedRoute />
        <div>ManageDrivers</div>
      {/* </ProtectedRoute> */}
    </>
  );
}

export default ManageDrivers;
