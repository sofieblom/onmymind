import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

export const Home = () => {
  const [posts, setPosts] = useState<PostType[]>([]);
  console.log("posts", posts);

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
    <div>
      <h1>this is home</h1>
    </div>
  );
};

interface PostType {
  title: string;
  text: string;
}
