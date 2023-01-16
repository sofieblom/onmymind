import cx from "classnames";
import { useState } from "react";
import { Link } from "react-router-dom";
import { PostType } from "..";
import edit from "../Posts/edit.png";
// import { SearchInput } from "../SearchInput";
import styles from "./styles.module.scss";

export const Posts = ({ filteredPosts }: PostsProps) => {
  const [selected, setSelected] = useState("");
  // const [inputText, setInputText] = useState("");

  const togglePost = (id: string) => {
    if (selected === id) {
      return setSelected("");
    }
    setSelected(id);
  };

  // const filteredPost = posts.filter((post) => {
  //   if (inputText === "") {
  //     return post;
  //   } else {
  //     return post.title.match(inputText);
  //   }
  // });

  // console.log("FILTERED POST", filteredPost);
  return (
    <>
      <div className={styles.container}>
        {/* <div className={styles.sortContainer}>
          <p className={styles.sort} onClick={() => setSortByNewest(true)}>
            SORT BY NEWEST
          </p>
          <p className={styles.sort} onClick={() => setSortByNewest(false)}>
            SORT BY OLDEST
          </p>
          <SearchInput posts={posts} setInputText={setInputText} />
        </div> */}

        {filteredPosts.map((post) => (
          <div key={post._id} className={styles.wrapper}>
            <div className={styles.desktopItem}>
              <div
                className={styles.toggleWrapper}
                onClick={() => togglePost(post._id)}
              >
                <div className={styles.infoWrapper}>
                  <h2 className={styles.title}>{post.title}</h2>
                  <p className={styles.date}>
                    {post.creationDate.split("T")[0]}
                  </p>
                </div>
                <div className={styles.handleWrapper}>
                  <span className={styles.handlePost}>
                    {selected === post._id ? "-" : "+"}
                  </span>
                </div>
              </div>
              <div
                className={cx(styles.contentWrapper, {
                  [styles.showContent]: selected === post._id,
                })}
              >
                <p className={styles.content}>{post.content}</p>
                <Link to={"/post/edit/" + post._id} key={post._id}>
                  <div className={styles.editWrapper}>
                    <img src={edit} width={20} />
                  </div>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

interface PostsProps {
  // allPosts: PostType[];

  // setSortByNewest: (x: boolean) => void;
  filteredPosts: PostType[];
}
