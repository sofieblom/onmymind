import axios from "axios";
import { ChangeEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import styles from "./styles.module.scss";
import * as yup from "yup";
import { IFormPostInputs } from "../../CreatePost/PostForm";
import { SubmitButton } from "../../../components/Button";
import { TextField } from "@mui/material";

const schema = yup.object().shape({
  title: yup.string().min(3).max(40).required("Don't leave this field empty"),
  content: yup.string().min(5).required("Don't leave this field empty"),
  creationDate: yup.string().required("You must choose a date"),
  // title: yup.string().when("post", {
  //   is: true,
  //   then: yup.string().required("Do not leave empty"),
  // }),
  // content: yup.string().when("post", {
  //   is: true,
  //   then: yup.string().required("Do not leave empty"),
  // }),
  // creationDate: yup.string().when("post", {
  //   is: true,
  //   then: yup.string().required("Choose a date"),
  // }),
});

export const EditPost = () => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormPostInputs>({
    resolver: yupResolver(schema),
  });

  const [currentPost, setCurrentPost] = useState<IFormPostInputs>({
    title: "",
    content: "",
    creationDate: "",
  });

  const [post, setPost] = useState(false);

  // RENDER COUNT
  // let renderCount = 0;
  // renderCount++;
  // console.log("RENDERCOUNT EDIT", renderCount);

  const params = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  console.log("CURRENT POST", currentPost);
  useEffect(() => {
    axios
      .get(`http://localhost:5000/posts/${params.id}`, {
        headers: { "x-api-token": token },
      })
      .then((response) => {
        console.log("RESPONSE DATA:", response.data);
        if (params.id === response.data._id) {
          setCurrentPost({
            title: response.data.title,
            content: response.data.content,
            creationDate: response.data.creationDate.split("T")[0],
          });
          setPost(true);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [params]);

  const onSubmit: SubmitHandler<IFormPostInputs> = (data: IFormPostInputs) => {
    // console.log("DATA", data);
    // if (
    //   currentPost.title.length > 0 &&
    //   currentPost.content.length > 0 &&
    //   currentPost.creationDate.length > 0
    // ) {
    // const updatedPost: IFormPostInputs = {
    //   title: currentPost.title,
    //   content: currentPost.content,
    //   creationDate: currentPost.creationDate,
    // };
    const updatedPost: IFormPostInputs = {
      title: data.title,
      content: data.content,
      creationDate: data.creationDate,
    };
    console.log("DATA I IF", data);

    axios
      .put(`http://localhost:5000/posts/edit/${params.id}`, updatedPost, {
        headers: { "x-api-token": token },
      })
      .then((response) => {
        navigate(`/post/${params.id}`);
        console.log(response.data);
      });
    // } else {
    //   setPost(true);
    // }
  };

  function handleChange(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setCurrentPost({ ...currentPost, [e.target.name]: e.target.value });
  }

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={styles.formContainer}
        >
          {/* <Controller
            control={control}
            name="title"
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="Title"
                required
                value={currentPost.title}
                error={!!errors.title}
                helperText={errors.title && `${errors.title.message}`}
              />
            )}
          /> */}
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

          {/* <Controller
            control={control}
            name="content"
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                multiline
                rows={10}
                label="What's on your mind?"
                required
                value={currentPost.content}
                error={!!errors.content}
                helperText={errors.content && `${errors.content.message}`}
              />
            )}
          /> */}

          {/* ////////////////////////////////////////////////// */}
          <textarea
            {...register("content")}
            placeholder="What's on your mind?"
            name="content"
            value={currentPost?.content}
            onChange={(e) => handleChange(e)}
          />
          <p>{errors.content?.message}</p>

          <SubmitButton>Save</SubmitButton>
        </form>
      </div>
    </div>
  );
};
