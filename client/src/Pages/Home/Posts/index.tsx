import { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { PostType } from "..";
import styles from "./styles.module.scss";
import cx from "classnames";

export const Posts = ({ posts }: PostsProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [currentPost, setCurrentPost] = useState("");

  // const postRef = useRef(null);

  useEffect(() => {});

  const handleMouseEnter = (id: string) => {
    setCurrentPost(id);
    console.log("ENTER");
    // setIsHovered(true);
  };

  const handleMouseLeave = () => {
    console.log("LEAVVE");
    setCurrentPost("");
  };

  return (
    <div className={styles.container}>
      {posts.map((post) => (
        <div className={styles.wrapper} key={post._id}>
          <Link to={"/post/" + post._id}>
            <div
              className={cx(styles.flex, {
                [styles.hideContent]: currentPost === post._id,
              })}
              onMouseEnter={() => handleMouseEnter(post._id)}
            >
              <div className={styles.contentContainer}>
                <h4 className={styles.title}>{post.title}</h4>
                <p className={styles.content}>{post.content}</p>
              </div>
            </div>
          </Link>
          <div
            className={styles.dateOnHover}
            onMouseLeave={() => handleMouseLeave()}
          >
            <Link to={"/post/" + post._id}>
              <p className={styles.dateParagraph}>
                {post.creationDate.split("T")[0]}
              </p>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

interface PostsProps {
  posts: PostType[];
}
