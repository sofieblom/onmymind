import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import styles from "./styles.module.scss";
import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import calendar from "../../../assets/calendar.svg";
import { TextField } from "@mui/material";
import { Input, TextArea } from "../../../components/Input";
import { SubmitButton } from "../../../components/Button";
import { useNavigate } from "react-router-dom";
// import { Input } from "../../../components/Input";

export const schema = yup.object().shape({
  title: yup.string().min(3).max(40).required("Don't leave this field empty"),
  content: yup.string().min(5).required("Don't leave this field empty"),
  creationDate: yup.string().required("You must choose a date"),
});

export const PostForm = ({ onSubmit }: PostFormProps) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IFormPostInputs>({
    resolver: yupResolver(schema),
  });

  const navigate = useNavigate();

  // RENDER COUNT
  let renderCount = 0;
  renderCount++;
  console.log("RENDERCOUNT CREATE POST", renderCount);

  const handleData = (data: IFormPostInputs) => {
    onSubmit(data);
    reset();
    navigate("/home");
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <form
          onSubmit={handleSubmit(handleData)}
          className={styles.formContainer}
        >
          <input
            {...register("title")}
            placeholder="Title"
            name="title"
            type="text"
            className={styles.inputField}
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
            className={styles.textareaField}
          />
          <div className={styles.errorWrapper}>
            <p className={styles.errorMessage}>{errors.content?.message}</p>
          </div>
          <SubmitButton>Save</SubmitButton>
        </form>
      </div>
    </div>
  );
};

export interface IFormPostInputs {
  title: string;
  content: string;
  creationDate: string;
}

interface PostFormProps {
  onSubmit: (data: IFormPostInputs) => void;
}
