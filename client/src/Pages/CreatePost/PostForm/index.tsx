import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import styles from "./styles.module.scss";

const schema = yup.object().shape({
  title: yup.string().required(),
  text: yup.string().required(),
});

export const PostForm = ({ onSubmit }: PostFormProps) => {
  const {
    register,
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

      <textarea
        {...register("text")}
        placeholder="What's on your mind?"
        name="text"
      />
      <p>{errors.text?.message}</p>

      <input type="submit" value="Save" />
    </form>
  );
};

export interface IFormPostInputs {
  title: string;
  text: string;
}

interface PostFormProps {
  onSubmit: (data: IFormPostInputs) => void;
}
