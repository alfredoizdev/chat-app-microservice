"use client";

import useLogout from "@/hooks/useLogout";
import styles from "./Navbar.module.scss";
import { useUserStore } from "@/store/userStore";

const Navbar = () => {
  const user = useUserStore((state) => state.user);
  const { handleLogout } = useLogout();

  return (
    <nav className={styles.navbar}>
      {user ? <h2>{user.username}</h2> : <h2>App</h2>}
      <div className={styles.buttonZone}>
        <button className={styles.add}>
          <i className="bi bi-person-add"></i>
        </button>
        <button onClick={handleLogout} className={styles.logout}>
          <i className="bi bi-box-arrow-in-right"></i>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
