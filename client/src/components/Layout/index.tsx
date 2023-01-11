import { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { HamburgerMeny } from "../HamburgerMenu";
import styles from "./styles.module.scss";
import image from "../../assets/meditation.png";
import cx from "classnames";

export const Layout = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const breakPoint = window.innerWidth > 768;

  useEffect(() => {
    function handleResize() {
      if (breakPoint) {
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
        <div className={styles.hamburgerMenu}>
          <HamburgerMeny
            handleLogOut={handleLogOut}
            setIsOpen={setIsOpen}
            isOpen={isOpen}
          />
        </div>
        <h1
          className={cx(styles.heading, {
            [styles.hideHeading]: isOpen && !breakPoint,
          })}
        >
          Journal of today
        </h1>
        <nav className={styles.nav}>
          <ul>
            <li>
              <Link to="/home">
                <h3 className={styles.underline}>MY POSTS</h3>
              </Link>
            </li>
            <li>
              <Link to="/posts/create-new">
                <h3 className={styles.underline}>NEW POST</h3>
              </Link>
            </li>
            <li onClick={handleLogOut}>
              <h3 className={styles.underline}>LOG OUT</h3>
            </li>
          </ul>
        </nav>
      </div>
      {isOpen ? (
        <div className={styles.open}>
          <Outlet />
        </div>
      ) : (
        <div className={styles.container}>
          <Outlet />
          <img src={image} width={350} className={styles.image} />
        </div>
      )}
    </>
  );
};
