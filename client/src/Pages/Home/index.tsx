import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Posts } from "./Posts";
import styles from "./styles.module.scss";

export const Home = () => {
  const [posts, setPosts] = useState<PostType[]>([]);

  const getPosts = async () => {
    const token = localStorage.getItem("token");
    axios
      .get("http://localhost:5000/posts", {
        headers: { "x-api-token": token },
      })
      .then((response) => {
        setPosts(response.data);
      });
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div className={styles.container}>
      <Posts posts={posts} />
    </div>
  );
};

export interface PostType {
  _id: string;
  title: string;
  content: string;
  creationDate: string;
}
