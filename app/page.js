"use client";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  const { data: session } = useSession();

  return (
    <div className={styles.main}>
      {!session ? (
        <div>
          Login now
          <br />
          <button
            onClick={async () => {
              await signIn("google");
            }}
          >
            Sign in with Google
          </button>
        </div>
      ) : (
        // redirect to dashboard
        <div>
          <h1>Welcome {session.user.name}</h1>
          <Image
            src={session.user.image}
            alt="user image"
            width={100}
            height={100}
          />
        </div>
      )}
    </div>
  );
}
