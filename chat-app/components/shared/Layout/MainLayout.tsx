"use client";
import useAuth from "@/hooks/useAuth";
import Navbar from "../Navbar/Navbar";
import styles from "./MainLayout.module.scss";
import Sidebar from "../Sidebar/Sidebar";

type LayoutProps = {
  children: React.ReactNode;
};

const MainLayout = ({ children }: LayoutProps) => {
  useAuth();

  return (
    <div className={styles.chatContainer}>
      <Sidebar />
      <div className={styles.messagesContainer}>
        <Navbar />
        {children}
      </div>
    </div>
  );
};

export default MainLayout;
