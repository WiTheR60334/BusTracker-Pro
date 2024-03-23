"use client";
import React, {useEffect} from "react";
import { useSession } from "next-auth/react";
import { message } from "antd";
import { useRouter } from "next/navigation";

function ManageDrivers() {
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
        <div>ManageDrivers</div>
      ) : null}
    </>
  );
}

export default ManageDrivers;
