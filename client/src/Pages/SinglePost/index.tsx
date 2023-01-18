import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { PostType } from "../Home";
import { DeletePost } from "./DeletePost";
import styles from "./styles.module.scss";
import { FormButton } from "../../components/Button";

export const SinglePost = () => {
  let params = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState<PostType>();

  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get(`http://localhost:5000/posts/${params.id}`, {
        headers: { "x-api-token": token },
      })
      .then((response) => {
        if (params.id === response.data._id) {
          setPost(response.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [params]);

  const handleEdit = () => {
    navigate("/post/edit/" + params.id);
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h1 className={styles.heading}>{post?.title}</h1>
        <p className={styles.content}>{post?.content}</p>
        <div className={styles.btnWrapper}>
          <p className={styles.date}>{post?.creationDate.split("T")[0]}</p>
          <div className={styles.gap}>
            <FormButton btnStyle="submit" type="submit" onClick={handleEdit}>
              Edit
            </FormButton>
            <DeletePost />
          </div>
        </div>
      </div>
    </div>
  );
};
