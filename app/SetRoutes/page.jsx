"use client";
import React, {useEffect} from 'react';
import { useSession } from "next-auth/react";
import { message } from "antd";
import { useRouter } from "next/navigation";
import ProtectedRoute from "../protected/page"

function SetRoutes() {
  const { status } = useSession();
  const router = useRouter();

  return (
    <ProtectedRoute>
        <div>SetRoutes</div>
    </ProtectedRoute>
  )
}

export default SetRoutes