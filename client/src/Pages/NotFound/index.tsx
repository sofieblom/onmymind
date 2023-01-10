import { Link } from "react-router-dom";
import styles from "./styles.module.scss";

export const NotFound = () => {
  const token = localStorage.getItem("token");

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>OOOPS, PAGE NOT FOUND</h1>

      {token ? <Link to="/home">Go home</Link> : <Link to="/">Go home</Link>}
    </div>
  );
};
