import { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { HamburgerMeny } from "../HamburgerMenu";
import styles from "./styles.module.scss";

export const Layout = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth > 768) {
        setIsOpen(false);
      }
    }
    window.addEventListener("resize", handleResize);
  });

  const handleLogOut = () => {
    localStorage.removeItem("token");
    navigate("/");
  };
  return (
    <>
      <div className={styles.header}>
        <nav className={styles.nav}>
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
        <div className={styles.hamburgerMenu}>
          <HamburgerMeny
            handleLogOut={handleLogOut}
            setIsOpen={setIsOpen}
            isOpen={isOpen}
          />
        </div>
      </div>
      {isOpen ? (
        <div className={styles.open}>
          <Outlet />
        </div>
      ) : (
        <Outlet />
      )}
    </>
  );
};
