"use client";
import React, {useEffect} from 'react';
import { useSession } from "next-auth/react";
import { message } from "antd";
import { useRouter } from "next/navigation";

function SetRoutes() {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status !== "authenticated") {
      router.push("/");
      message.info("You need to login to access this page");
    }
  }, [status, router]);

  return (
    <>
      {status === "authenticated" ? (
        <div>SetRoutes</div>
      ) : null}
      </>
  )
}

export default SetRoutes