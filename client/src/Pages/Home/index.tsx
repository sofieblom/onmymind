import axios from "axios";
import { useEffect, useState } from "react";
import { Paginate } from "./Paginate";
import { Posts } from "./Posts";
import { SearchInput } from "./SearchInput";
import styles from "./styles.module.scss";

export const Home = () => {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);
  const [sortByNewest, setSortByNewest] = useState(true);
  const [inputText, setInputText] = useState("");

  const filteredPosts = posts.filter((post) => {
    if (inputText === "") {
      return post;
    } else {
      return post.title.match(inputText);
    }
  });

  console.log("FILTERED POST", filteredPosts);

  const sortedPostsByNewest = [...filteredPosts].sort((a, b) => {
    const first = new Date(a.creationDate).getTime();
    const second = new Date(b.creationDate).getTime();
    return second - first;
  });

  const sortedPostsByOldest = [...filteredPosts].sort((a, b) => {
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
      <div className={styles.sortContainer}>
        <p className={styles.sort} onClick={() => setSortByNewest(true)}>
          SORT BY NEWEST
        </p>
        <p className={styles.sort} onClick={() => setSortByNewest(false)}>
          SORT BY OLDEST
        </p>
        <SearchInput posts={posts} setInputText={setInputText} />
      </div>
      <Posts
        // posts={currentPosts}
        // setSortByNewest={setSortByNewest}
        // allPosts={sortedPostsByNewest}
        filteredPosts={currentPosts}
      />

      {currentPosts.length >= 10 && (
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
