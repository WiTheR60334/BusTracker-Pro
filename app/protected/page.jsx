"use client";
// import { getServerSession } from "next-auth";
// import { redirect } from "next/navigation";

// export default async function ProtectedRoute() {
//   const session = await getServerSession();
//   if (session) {
//     console.log("Authenticated");
//   } else {
//     console.log("Not Authenticated");
//     redirect("/");
//   }
//   return <div>This is a Protected Route</div>;
// }
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { message } from "antd";

export default function ProtectedRoute({ children }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return; // Wait until session status is resolved

    if (!session) {
      message.info("You need to login to access this page");
      router.replace("/");
    }
  }, [session, status, router]);

  // Render children only if user is authenticated
  return session ? <>{children}</> : null;
}
