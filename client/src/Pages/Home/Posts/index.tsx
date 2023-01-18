import cx from "classnames";
import { useState } from "react";
import { Link } from "react-router-dom";
import { PostType } from "..";
import edit from "../Posts/edit.png";
import styles from "./styles.module.scss";

export const Posts = ({ filteredPosts }: PostsProps) => {
  const [selected, setSelected] = useState("");

  const togglePost = (id: string) => {
    if (selected === id) {
      return setSelected("");
    }
    setSelected(id);
  };

  return (
    <>
      {filteredPosts.length >= 1 && (
        <div className={styles.container}>
          {filteredPosts.map((post) => (
            <div
              key={post._id}
              className={cx(styles.wrapper, {
                [styles.currentWrapper]: selected === post._id,
              })}
            >
              <div className={styles.desktopItem}>
                <div
                  className={styles.toggleWrapper}
                  data-test="post-wrapper"
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
                      <img src={edit} width={20} data-test="post-edit-button" />
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

interface PostsProps {
  filteredPosts: PostType[];
}
