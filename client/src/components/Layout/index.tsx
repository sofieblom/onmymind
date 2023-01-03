import { Link, Outlet, useNavigate } from "react-router-dom";
import styles from "./styles.module.scss";

export const Layout = () => {
  const navigate = useNavigate();

  const handleLogOut = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <>
      <div className={styles.header}>
        <nav>
          <ul>
            <li>
              <Link to="/home">
                <h3>MY POSTS</h3>
              </Link>
            </li>
            <li>
              <Link to="/posts/create-new">
                <h3>NEW POST</h3>
              </Link>
            </li>
            <li onClick={handleLogOut}>
              <h3>LOG OUT</h3>
            </li>
          </ul>
        </nav>
      </div>
      <Outlet></Outlet>
    </>
  );
};
