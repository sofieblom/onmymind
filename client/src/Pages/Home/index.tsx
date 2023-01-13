import axios from "axios";
import { useEffect, useState } from "react";
import { Paginate } from "./Paginate";
import { Posts } from "./Posts";
import styles from "./styles.module.scss";

export const Home = () => {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);
  const [sortByNewest, setSortByNewest] = useState(true);

  const sortedPostsByNewest = [...posts].sort((a, b) => {
    const first = new Date(a.creationDate).getTime();
    const second = new Date(b.creationDate).getTime();
    return second - first;
  });

  const sortedPostsByOldest = [...posts].sort((a, b) => {
    const first = new Date(a.creationDate).getTime();
    const second = new Date(b.creationDate).getTime();
    return first - second;
  });

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;

  const currentPosts = sortByNewest
    ? sortedPostsByNewest.slice(indexOfFirstPost, indexOfLastPost)
    : sortedPostsByOldest.slice(indexOfFirstPost, indexOfLastPost);

  const nPages = Math.ceil(posts.length / postsPerPage);

  useEffect(() => {
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
  }, []);

  return (
    <div className={styles.container}>
      <Posts posts={currentPosts} setSortByNewest={setSortByNewest} />
      {posts.length > 10 && (
        <Paginate
          nPages={nPages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      )}
    </div>
  );
};

export interface PostType {
  _id: string;
  title: string;
  content: string;
  creationDate: string;
}
