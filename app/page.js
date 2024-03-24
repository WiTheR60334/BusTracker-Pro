"use client";
import { signIn, useSession, signOut} from "next-auth/react";
import Image from "next/image";
import { FcGoogle } from "react-icons/fc";
import styles from "./page.module.css";
import React, {useState, useEffect} from "react";
import { useRouter } from "next/navigation";
import { SessionProvider } from "next-auth/react";

export default function Home() {
  const isValidEmail = (email) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  };

  const router = useRouter();
  const [error, setError] = useState("");
  const {status} = useSession();

  useEffect(() => {
    if (status === "authenticated") {
      router.replace("/dashboard");
    } else {
      router.replace("/");
    }
  }, [status, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    if (!isValidEmail(email)) {
      setError("Email is invalid");
      return;
    }

    if (!password || password.length < 8) {
      setError("Password is invalid");
      return;
    }

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password
    });

    if (res?.error) {
      setError("Invalid email or password");
      if (res?.url) router.push("/dashboard");
    } else {
      setError("");
    }
  };

  return (
    <SessionProvider session={status}>
    <div className={styles.main}>
      <div className={styles.container}>
      <div className={styles.title}>Welcome Back</div>
      <div className={styles.titlePara}>Log in with AU credentials only</div>
      <form onSubmit={handleSubmit}>
      <div className={styles.username}>
        <input type="text" placeholder="Email" required className={styles.userName}></input>
      </div>
      <div className={styles.username}>
        <input type="password" placeholder="Password" required className={styles.password}></input>
      </div>
      <div className={styles.login}>
        <button type="submit" className={styles.button}>Login</button>
      </div>
      <p className={styles.error}>{error && error}</p>
      </form>
      <div className={styles.or}>or</div>
      <div className={styles.loginWithGoogle}>
        <button
          onClick={async () => {
            await signIn("google");
          }}
          className={styles.google}
        >
          <FcGoogle style={{marginRight: '.5rem'}} />
          Login with Google
        </button>
        </div>
    </div>
    </div>
    </SessionProvider>
  );
}
