import { Link, useNavigate, useParams } from "react-router-dom";
import { PostType } from "..";
import styles from "./styles.module.scss";

export const Posts = ({ posts }: PostsProps) => {
  return (
    <div className={styles.container}>
      {posts.map((post) => (
        <div className={styles.wrapper} key={post._id}>
          <Link to={"/post/" + post._id}>
            <div className={styles.flex}>
              <div className={styles.dateContainer}>
                <p>{post.creationDate.split("T")[0]}</p>
              </div>
              <div className={styles.contentContainer}>
                <h4>{post.title}</h4>
                <p className={styles.content}>{post.content}</p>
              </div>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};

interface PostsProps {
  posts: PostType[];
}
