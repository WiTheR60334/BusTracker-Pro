"use client";
import { Inter } from "next/font/google";
import Sidebar from "../components/Sidebar/Sidebar";
import {Providers} from "./Providers";
import "./globals.css";
import styles from "./layout.module.css";
import {React, useState, useEffect} from "react";
import { MdOutlineMenu } from 'react-icons/md';
import ProtectedRoute from "./protected/page";

const inter = Inter({ subsets: ["latin"] });

// export const metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
// };

export default function RootLayout({ children }) {
  const [isActive, setIsActive] = useState(true);
  const [SidebarIsActive, setSidebarIsActive] = useState(true);
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth);
    }

    setWindowWidth(window.innerWidth);

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    setIsActive(windowWidth >= 768);
  }, [windowWidth]);

  const toggleMenu = () => {
    setIsActive(!isActive);
    setSidebarIsActive(true);
  };
  
  const handleLinkClick = () => {
    if (windowWidth < 768) {
      setSidebarIsActive(false);
      setIsActive(false);
    }
  };

  return (
    <html lang="en" style={{ height: "100%" }}>
      <body
        className={inter.className}
        style={{ margin: "0px", height: "100%" }}
      >
        <Providers>
          <div className={styles.main}>
            <ProtectedRoute>
            <div
            className={`${styles.sidebar} ${isActive ? 'active' : ''} ${SidebarIsActive ? 'active' : ''}`}
            style={{
              transform: (isActive && SidebarIsActive) ? 'scale(1)' : 'scale(0)',
              width: (windowWidth < 651 && isActive && SidebarIsActive) ? '14rem' : ((isActive && SidebarIsActive) ? '19rem' : '0'),
              display: (isActive && SidebarIsActive) ? 'flex' : 'none',
              position: (isActive && SidebarIsActive) ? 'fixed' : 'none',
              // animation: isActive && SidebarIsActive ? 'showMenu .8s' : 'hideMenu .8s'
            }}
          >
            <Sidebar onLinkClick={handleLinkClick} />
          </div>
          </ProtectedRoute>

            <div
              className={styles.right}
              style={{
                marginLeft: (isActive && SidebarIsActive) ? (windowWidth < 651 ? '14rem' : '19rem') : '0',
                display: (windowWidth < 768 && isActive && SidebarIsActive) ? 'flex' : 'block',
                flexDirection: 'column',
                // animation: isActive && SidebarIsActive ? 'showMenu .8s' : 'hideRight .8s'
              }}
            >
          <ProtectedRoute>

              <div className={styles.rest}>
                <div className={styles.title}>
                  <ProtectedRoute>
                  {typeof window !== 'undefined' && window.innerWidth < 768  &&
                    !isActive && (
                    <MdOutlineMenu className={styles.menuIcon} onClick={toggleMenu} />
                  )}
                  </ProtectedRoute>
                  <div className={styles.bus}>Bus Tracker Pro</div>
                </div>
              </div>
          </ProtectedRoute>

              <div className={styles.dock}>{children}</div>
            </div>

          </div>
        <style jsx>{`
          @keyframes showMenu {
            from {
              transform: translateX(-100%);
            }
            to {
              transform: translateX(0%);
            }
          }
          @keyframes hideMenu {
            from {
              transform: translateX(0%);
            }
            to {
              transform: translateX(-100%);
            }
          }

          @keyframes hideRight {
            from {
              transform: translateX(100%);
            }
            to {
              transform: translateX(0%);
            }
          }
        `}</style>
        </Providers>
      </body>
    </html>
  );
}