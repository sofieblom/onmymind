import { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { PostType } from "..";
import styles from "./styles.module.scss";
import cx from "classnames";
import edit from "../Posts/edit.png";

export const Posts = ({ posts }: PostsProps) => {
  const [currentPost, setCurrentPost] = useState("");
  const [selected, setSelected] = useState("");

  const handleMouseEnter = (id: string) => {
    setCurrentPost(id);
  };

  const handleMouseLeave = () => {
    setCurrentPost("");
  };

  console.log("selected", selected);
  const tabletOrBigger = window.innerWidth > 768;

  const togglePost = (id: string) => {
    if (selected === id) {
      return setSelected("");
    }

    setSelected(id);
  };
  return (
    <div className={styles.container}>
      {posts.map((post) => (
        <div key={post._id} className={styles.wrapper}>
          {!tabletOrBigger ? (
            <Link to={"/post/" + post._id} key={post._id}>
              <div className={styles.mobileItem}>
                <h2 className={styles.title}>{post.title}</h2>
                <p className={styles.content}>{post.content}</p>
                <p className={styles.date}>{post.creationDate.split("T")[0]}</p>
              </div>
            </Link>
          ) : (
            <div className={styles.desktopItem}>
              <div
                className={styles.desktopWrapper}
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
                <Link to={"/post/" + post._id} key={post._id}>
                  <div className={styles.editWrapper}>
                    <img src={edit} width={20} />
                  </div>
                </Link>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
    // <div className={styles.container}>
    //   {posts.map((post) => (
    //     <div className={styles.wrapper} key={post._id}>
    //       <Link to={"/post/" + post._id}>
    //         <div
    //           className={cx(styles.flex, {
    //             [styles.hideContent]:
    //               currentPost === post._id && tabletOrBigger,
    //           })}
    //           onMouseEnter={() => handleMouseEnter(post._id)}
    //         >
    //           <div className={styles.contentContainer}>
    //             {!tabletOrBigger ? (
    //               <div className={styles.contentWrapperMobile}>
    //                 <h4 className={styles.title}>{post.title}</h4>
    //                 <p className={styles.content}>{post.content}</p>
    //                 <p className={styles.date}>
    //                   {post.creationDate.split("T")[0]}
    //                 </p>
    //               </div>
    //             ) : (
    //               <div className={styles.contentWrapperDesktop}>
    //                 <h4 className={styles.title}>{post.title}</h4>
    //                 <p className={styles.date}>
    //                   {post.creationDate.split("T")[0]}
    //                 </p>
    //               </div>
    //             )}
    //           </div>
    //         </div>
    //       </Link>
    //       {tabletOrBigger && (
    //         <Link to={"/post/" + post._id}>
    //           <div
    //             className={styles.dateOnHover}
    //             onMouseLeave={() => handleMouseLeave()}
    //           >
    //             <p className={styles.content}>{post.content}</p>
    //           </div>
    //         </Link>
    //       )}
    //     </div>
    //   ))}
    // </div>
  );
};

interface PostsProps {
  posts: PostType[];
}
