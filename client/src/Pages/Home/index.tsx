import axios from "axios";
import { useEffect, useState } from "react";
import { Paginate } from "./Paginate";
import { Posts } from "./Posts";
import styles from "./styles.module.scss";

export const Home = () => {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);

  const postsReverse = [...posts].reverse();

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;

  const currentPosts = postsReverse.slice(indexOfFirstPost, indexOfLastPost);

  const nPages = Math.ceil(posts.length / postsPerPage);

  const getPosts = async () => {
    const token = localStorage.getItem("token");
    axios
      .get("http://localhost:5000/posts", {
        headers: { "x-api-token": token },
      })
      .then((response) => {
        setPosts(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div className={styles.container}>
      <Posts posts={currentPosts} />
      <Paginate
        nPages={nPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

export interface PostType {
  _id: string;
  title: string;
  content: string;
  creationDate: string;
}
