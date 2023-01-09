import { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { PostType } from "..";
import styles from "./styles.module.scss";
import cx from "classnames";

export const Posts = ({ posts }: PostsProps) => {
  const [currentPost, setCurrentPost] = useState("");

  const handleMouseEnter = (id: string) => {
    setCurrentPost(id);
  };

  const handleMouseLeave = () => {
    setCurrentPost("");
  };

  const tabletOrBigger = window.innerWidth > 768;

  return (
    <div className={styles.container}>
      {/* <div className={styles.postContainer}> */}
      {posts.map((post) => (
        <div className={styles.wrapper} key={post._id}>
          <Link to={"/post/" + post._id}>
            <div
              className={cx(styles.flex, {
                [styles.hideContent]:
                  currentPost === post._id && tabletOrBigger,
              })}
              onMouseEnter={() => handleMouseEnter(post._id)}
            >
              <div className={styles.contentContainer}>
                {!tabletOrBigger ? (
                  <div>
                    <h4 className={styles.title}>{post.title}</h4>
                    <p className={styles.content}>{post.content}</p>
                    <p className={styles.dateOnMobile}>
                      {post.creationDate.split("T")[0]}
                    </p>
                  </div>
                ) : (
                  <div>
                    <h4 className={styles.title}>{post.title}</h4>
                    <p className={styles.dateParagraph}>
                      {post.creationDate.split("T")[0]}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </Link>
          {tabletOrBigger && (
            <Link to={"/post/" + post._id}>
              <div
                className={styles.dateOnHover}
                onMouseLeave={() => handleMouseLeave()}
              >
                <p className={styles.content}>{post.content}</p>
              </div>
            </Link>
          )}
        </div>
      ))}
      {/* </div> */}
    </div>
  );
};

interface PostsProps {
  posts: PostType[];
}
