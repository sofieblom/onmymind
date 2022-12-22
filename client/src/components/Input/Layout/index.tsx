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
              <Link to="/posts/create-new">
                <h3>NY POST</h3>
              </Link>
            </li>
            <li onClick={handleLogOut}>
              <h3>LOGGA UT</h3>
            </li>
          </ul>
        </nav>
      </div>
      <Outlet></Outlet>
    </>
  );
};
