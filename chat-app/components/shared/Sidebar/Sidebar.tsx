import UserList from "@/components/UserList/UserList";
import styles from "./Sidebar.module.scss";

const Sidebar = () => {
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
        <UserList />
      </ul>
    </div>
  );
};

export default Sidebar;
