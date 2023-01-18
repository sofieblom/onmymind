import { Link } from "react-router-dom";
import styles from "./styles.module.scss";

export const NotFound = () => {
  const token = localStorage.getItem("token");

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>OOOPS, SOMETHING WENT WRONG</h1>

      {token ? (
        <Link className={styles.home} to="/home">
          Go home
        </Link>
      ) : (
        <Link className={styles.home} to="/">
          Go home
        </Link>
      )}
    </div>
  );
};
