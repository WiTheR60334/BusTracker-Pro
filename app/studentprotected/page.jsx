"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { message } from "antd";

function StudentProtectedRoute(props) {
  const { data: session, status } = useSession();
  const [User, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const response = await fetch("/api/RoleConnector", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: session.user.email }), // Change to the appropriate email
        });

        if (!response.ok) {
          throw new Error("Failed to fetch student data");
        }

        const data = await response.json();
        setUser(data.body);
        console.log(
          "this is the message received on client side : ",
          data.body
        );
      } catch (error) {
        console.error("Error fetching student data:", error);
      }
    };

    fetchStudentData();
  }, [session]);

  useEffect(() => {
    if (status === "loading") return;
    if (User && User.role !== "student") {
      return;
    }
  }, [User, session, status]);

  return User && User.role === "student" ? <>{props.children}</> : null;
}

export default StudentProtectedRoute;