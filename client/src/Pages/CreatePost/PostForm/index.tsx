import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import styles from "./styles.module.scss";

import { useState } from "react";

const schema = yup.object().shape({
  title: yup.string().required(),
  content: yup.string().required(),
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
  const [date, setDate] = useState(new Date());

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
      <input {...register("creationDate")} name="creationDate" type="date" />

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
