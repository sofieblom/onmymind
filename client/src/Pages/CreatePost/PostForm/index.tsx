import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import styles from "./styles.module.scss";
import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

export const schema = yup.object().shape({
  title: yup.string().required(),
  content: yup.string().required(),
  creationDate: yup.string().required(),
});

export const PostForm = ({ onSubmit }: PostFormProps) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormPostInputs>({
    resolver: yupResolver(schema),
  });

  const handleData = (data: IFormPostInputs) => {
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(handleData)} className={styles.formContainer}>
      <input
        {...register("title")}
        placeholder="Title"
        name="title"
        type="text"
      />
      <p>{errors.title?.message}</p>
      {/* <input {...register("creationDate")} name="creationDate" type="date" /> */}

      <Controller
        control={control}
        name="creationDate"
        rules={{ required: "You have to choose a date" }}
        render={({ field: { onChange } }) => <Calendar onChange={onChange} />}
      />
      <textarea
        {...register("content")}
        placeholder="What's on your mind?"
        name="content"
      />
      <p>{errors.content?.message}</p>

      <input type="submit" value="Save" />
    </form>
  );
};

export interface IFormPostInputs {
  title: string;
  content: string;
  creationDate: any;
}

interface PostFormProps {
  onSubmit: (data: IFormPostInputs) => void;
}
