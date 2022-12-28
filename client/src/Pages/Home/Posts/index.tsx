import { Link, useNavigate, useParams } from "react-router-dom";
import { PostType } from "..";
import styles from "./styles.module.scss";

export const Posts = ({ posts }: PostsProps) => {
  return (
    <div className={styles.container}>
      {posts.map((post) => (
        <div className={styles.wrapper} key={post._id}>
          <Link to={"/post/" + post._id}>
            <h4>{post.title}</h4>
            <p>{post.content}</p>
            <p>{post.creationDate.split("T")[0]}</p>
            <p>{post.creationDate}</p>
          </Link>
        </div>
      ))}
    </div>
  );
};

interface PostsProps {
  posts: PostType[];
}
