import { PostForm } from "./PostForm";
import styles from "./styles.module.scss";
import { SubmitHandler } from "react-hook-form";
import { IFormPostInputs } from "./PostForm";
import axios from "axios";

export const CreatePost = () => {
  const onSubmit: SubmitHandler<IFormPostInputs> = (data: IFormPostInputs) => {
    if (data) {
      const newPost: IFormPostInputs = {
        title: data.title,
        content: data.content,
        creationDate: data.creationDate,
      };
      const token = localStorage.getItem("token");

      axios
        .post("http://localhost:5000/posts/newPost", newPost, {
          headers: { "x-api-token": token },
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <div className={styles.container}>
      <PostForm onSubmit={onSubmit} />
    </div>
  );
};
