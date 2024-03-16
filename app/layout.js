import { Inter } from "next/font/google";
import "./globals.css";
import styles from "./layout.module.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" style={{height: '100%'}}>
      <body className={inter.className} style={{margin: '0px', height: '100%'}}>
        <div className={styles.main}>
          <div className={styles.rest}>
            <div className={styles.title}>
              Bus Tracker Pro
            </div>
          </div>
          <div className={styles.dock}>
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
