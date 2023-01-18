import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FormButton } from "../../components/Button";
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
  const [loading, setLoading] = useState(false);

  const filteredPosts = posts.filter((post) => {
    if (inputText === "") {
      return post;
    } else {
      return post.title.match(inputText);
    }
  });

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
  const paginate = filteredPosts.length > 10 || currentPage > 1;

  useEffect(() => {
    setLoading(true);
    const token = localStorage.getItem("token");
    axios
      .get("http://localhost:5000/posts", {
        headers: { "x-api-token": token },
      })
      .then((response) => {
        setPosts(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  if (loading) return null;

  return (
    <div className={styles.container}>
      {posts.length > 0 ? (
        <div className={styles.filterContainer}>
          <SearchInput posts={posts} setInputText={setInputText} />
          <div className={styles.sortContainer}>
            <p className={styles.sort} onClick={() => setSortByNewest(true)}>
              SORT BY NEWEST
            </p>
            <p className={styles.sort} onClick={() => setSortByNewest(false)}>
              SORT BY OLDEST
            </p>
          </div>
        </div>
      ) : (
        <div className={styles.noPostContainer}>
          <p className={styles.noPostText}>You haven't written a post yet</p>
          <Link to="/posts/create-new">
            <FormButton type="button" btnStyle="submit">
              Create your first post
            </FormButton>
          </Link>
        </div>
      )}
      <Posts filteredPosts={currentPosts} />

      {paginate && (
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
