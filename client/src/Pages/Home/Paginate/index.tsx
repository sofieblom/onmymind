import { ClassNames } from "@emotion/react";
import { PostType } from "..";
import styles from "./styles.module.scss";
import cx from "classnames";

export const Paginate = ({
  nPages,
  currentPage,
  setCurrentPage,
}: PaginateProps) => {
  const pageNumbers = Array.from(Array(nPages), (_, index) => index + 1);

  const prevPage = () => {
    if (currentPage !== 1) setCurrentPage(currentPage - 1);
  };

  const nextPage = () => {
    if (currentPage !== nPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div className={styles.container}>
      <nav>
        <ul className={styles.list}>
          <li className={styles.pageItem}>
            <a className={styles.link} onClick={prevPage} href="#">
              Previous
            </a>
          </li>
          {pageNumbers.map((pgNumber) => (
            <li
              key={pgNumber}
              className={cx(styles.pageItem, {
                [styles.active]: currentPage == pgNumber,
              })}
            >
              <a
                onClick={() => setCurrentPage(pgNumber)}
                className={styles.link}
                href="#"
              >
                {pgNumber}
              </a>
            </li>
          ))}
          <li className={styles.pageItem}>
            <a className={styles.link} onClick={nextPage} href="#">
              Next
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

interface PaginateProps {
  nPages: number;
  currentPage: number;
  setCurrentPage: (x: number) => void;
}
