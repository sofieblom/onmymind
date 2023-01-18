import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import styles from "./styles.module.scss";
import { IFormPostInputs } from "../../CreatePost/PostForm";
import { FormButton } from "../../../components/Button";
import { DeletePost } from "../DeletePost";
import { schema } from "../../CreatePost/PostForm";

export const EditPost = () => {
  const params = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IFormPostInputs>({
    resolver: yupResolver(schema),
  });

  const [currentPost, setCurrentPost] = useState<IFormPostInputs>({
    title: "",
    content: "",
    creationDate: "",
  });

  useEffect(() => {
    axios
      .get(`http://localhost:5000/posts/${params.id}`, {
        headers: { "x-api-token": token },
      })
      .then((response) => {
        if (response.status === 200) {
          if (params.id === response.data._id) {
            setCurrentPost({
              title: response.data.title,
              content: response.data.content,
              creationDate: response.data.creationDate.split("T")[0],
            });
          }
        }
      })
      .catch((error) => {
        console.log(error);
        if (error.response.status !== 200) {
          window.location.href = "/*";
        }
      });
  }, [params]);

  useEffect(() => {
    reset(currentPost);
  }, [currentPost]);

  const onSubmit: SubmitHandler<IFormPostInputs> = (data: IFormPostInputs) => {
    const updatedPost: IFormPostInputs = {
      title: data.title,
      content: data.content,
      creationDate: data.creationDate,
    };

    axios
      .put(`http://localhost:5000/posts/edit/${params.id}`, updatedPost, {
        headers: { "x-api-token": token },
      })
      .then((response) => {
        navigate(`/post/${params.id}`);
      });
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={styles.formContainer}
        >
          <input
            {...register("title")}
            placeholder="Title"
            name="title"
            type="text"
          />
          <div className={styles.errorWrapper}>
            <p className={styles.errorMessage}>{errors.title?.message}</p>
          </div>

          <input
            {...register("creationDate")}
            name="creationDate"
            type="date"
          />
          <div className={styles.errorWrapper}>
            <p className={styles.errorMessage}>
              {errors.creationDate?.message}
            </p>
          </div>

          <textarea
            {...register("content")}
            placeholder="What's on your mind?"
            name="content"
            data-test="edit-post-content"
          />
          <div className={styles.errorWrapper}>
            <p className={styles.errorMessage}>{errors.content?.message}</p>
          </div>

          <div className={styles.btnWrapper}>
            <DeletePost />
            <FormButton btnStyle="submit">Save</FormButton>
          </div>
        </form>
      </div>
    </div>
  );
};
