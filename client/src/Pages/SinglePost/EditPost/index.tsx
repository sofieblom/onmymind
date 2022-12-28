import axios from "axios";
import { ChangeEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { PostType } from "../../Home";
import { IFormPostInputs, schema } from "../../CreatePost/PostForm";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import styles from "./styles.module.scss";

export const EditPost = () => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormPostInputs>({
    resolver: yupResolver(schema),
  });
  const params = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [currentPost, setCurrentPost] = useState({
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
        console.log(response.data);
        if (params.id === response.data._id) {
          setCurrentPost({
            title: response.data.title,
            content: response.data.content,
            // creationDate: response.data.creationDate.split("T")[0],
            creationDate: response.data.creationDate,
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [params]);

  console.log("currentpost", currentPost);

  const onSubmit: SubmitHandler<IFormPostInputs> = (data: IFormPostInputs) => {
    if (data) {
      const updatedPost: IFormPostInputs = {
        title: currentPost.title,
        content: currentPost.content,
        creationDate: currentPost.creationDate,
      };

      axios
        .put(`http://localhost:5000/posts/edit/${params.id}`, updatedPost, {
          headers: { "x-api-token": token },
        })
        .then((response) => {
          console.log(response.data);
        });
    }
  };

  function handleChange(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setCurrentPost({ ...currentPost, [e.target.name]: e.target.value });
  }

  return (
    <div>
      <h1>{currentPost?.title}</h1>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.formContainer}>
        <input
          {...register("title")}
          placeholder="Title"
          name="title"
          type="text"
          value={currentPost?.title}
          onChange={(e) => handleChange(e)}
        />
        <p>{errors.title?.message}</p>
        <input
          {...register("creationDate")}
          name="creationDate"
          type="date"
          value={currentPost?.creationDate}
          onChange={(e) => handleChange(e)}
        />

        <textarea
          {...register("content")}
          placeholder="What's on your mind?"
          name="content"
          value={currentPost?.content}
          onChange={(e) => handleChange(e)}
        />
        <p>{errors.content?.message}</p>

        <input type="submit" value="Save" />
      </form>
    </div>
  );
};
