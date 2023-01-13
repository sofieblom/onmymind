import { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { PostType } from "..";
import styles from "./styles.module.scss";
import cx from "classnames";
import edit from "../Posts/edit.png";

export const Posts = ({ posts, setSortByNewest }: PostsProps) => {
  const [selected, setSelected] = useState("");

  const togglePost = (id: string) => {
    if (selected === id) {
      return setSelected("");
    }

    setSelected(id);
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.sortContainer}>
          <p className={styles.sort} onClick={() => setSortByNewest(true)}>
            SORT BY NEWEST
          </p>
          <p className={styles.sort} onClick={() => setSortByNewest(false)}>
            SORT BY OLDEST
          </p>
        </div>
        {posts.map((post) => (
          <div key={post._id} className={styles.wrapper}>
            <div className={styles.desktopItem}>
              <div
                className={styles.toggleWrapper}
                onClick={() => togglePost(post._id)}
              >
                <div className={styles.infoWrapper}>
                  <h2 className={styles.title}>{post.title}</h2>
                  <p className={styles.date}>
                    {post.creationDate.split("T")[0]}
                  </p>
                </div>
                <div className={styles.handleWrapper}>
                  <span className={styles.handlePost}>
                    {selected === post._id ? "-" : "+"}
                  </span>
                </div>
              </div>
              <div
                className={cx(styles.contentWrapper, {
                  [styles.showContent]: selected === post._id,
                })}
              >
                <p className={styles.content}>{post.content}</p>
                <Link to={"/post/edit/" + post._id} key={post._id}>
                  <div className={styles.editWrapper}>
                    <img src={edit} width={20} />
                  </div>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

interface PostsProps {
  posts: PostType[];
  setSortByNewest: (x: boolean) => void;
}
