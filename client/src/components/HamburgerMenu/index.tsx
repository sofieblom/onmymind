import styles from "./styles.module.scss";
import xmark from "../../assets/xmark.png";
import bars from "../../assets/bars.png";
import { useState } from "react";
import { Link } from "react-router-dom";

export const HamburgerMeny = ({
  handleLogOut,
  isOpen,
  setIsOpen,
}: HamburgerMenyProps) => {
  //   const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      {!isOpen ? (
        <div className={styles.container}>
          <img
            src={bars}
            className={styles.bars}
            onClick={() => setIsOpen(!isOpen)}
          />
        </div>
      ) : (
        <>
          <div className={styles.container}>
            <img
              src={xmark}
              className={styles.xmark}
              onClick={() => setIsOpen(!isOpen)}
            />
          </div>
          <div className={styles.hamburger}>
            <nav className={styles.nav}>
              <ul className={styles.ul}>
                <li>
                  <Link to="/home" onClick={() => setIsOpen(false)}>
                    <h3>MY POSTS</h3>
                  </Link>
                </li>
                <li>
                  <Link to="/posts/create-new" onClick={() => setIsOpen(false)}>
                    <h3>NEW POST</h3>
                  </Link>
                </li>
                <li onClick={handleLogOut}>
                  <h3>LOG OUT</h3>
                </li>
              </ul>
            </nav>
          </div>
        </>
      )}
    </>
  );
};

interface HamburgerMenyProps {
  handleLogOut: () => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}
