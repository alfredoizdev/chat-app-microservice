import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { User } from "@/types/user";

import { fetchUser } from "@/actions/userAction";

import styles from "./Sidebar.module.scss";
import { useUserStore } from "@/store/userStore";

const Sidebar = () => {
  const [users, setUsers] = useState<User[] | []>([]);
  const router = useRouter();

  const setUser = useUserStore((state) => state.setUser);

  const handleOnClick = (user: User) => {
    setUser(user);
    router.push(`/chat/room/${user.id}`);
  };

  useEffect(() => {
    const gettingUsers = async () => {
      const data = await fetchUser();
      if (data) {
        setUsers(data);
      }
    };

    gettingUsers();
  }, []);

  return (
    <div className={styles.sidebar}>
      <ul className={styles.userList}>
        <li className={styles.sidebarHeader}>
          <div className={`${styles.formZone} fromGroup`}>
            <i className="bi bi-search"></i>
            <input
              className={styles.searchInput}
              type="text"
              placeholder="Search users"
            />
          </div>
        </li>
        <li>
          <div className={styles.subHeader}>
            <h2>Users</h2>
          </div>
        </li>
        {users.map((user) => (
          <li
            className={styles.user}
            key={user.id}
            onClick={() => handleOnClick(user)}
          >
            <i className="bi bi-person-circle"></i>
            <span className={styles.userName}>{user.username}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
