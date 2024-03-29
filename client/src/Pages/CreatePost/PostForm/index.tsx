import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import styles from "./styles.module.scss";
import { FormButton } from "../../../components/Button";
import { useNavigate } from "react-router-dom";

export const schema = yup.object().shape({
  title: yup.string().min(2).max(50).required("don't leave this field empty"),
  content: yup.string().min(2).required("don't leave this field empty"),
  creationDate: yup.string().required("you must choose a date"),
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
          data-test="create-post-form"
        >
          <input
            {...register("title")}
            placeholder="Title"
            name="title"
            type="text"
            data-test="create-post-title"
            className={styles.inputField}
          />
          <div className={styles.errorWrapper}>
            <p
              className={styles.errorMessage}
              data-test="create-post-error-title"
            >
              {errors.title?.message}
            </p>
          </div>
          <input
            {...register("creationDate")}
            name="creationDate"
            type="datetime-local"
            data-test="create-post-date"
          />
          <div className={styles.errorWrapper}>
            <p
              className={styles.errorMessage}
              data-test="create-post-error-date"
            >
              {errors.creationDate?.message}
            </p>
          </div>
          <textarea
            {...register("content")}
            placeholder="What's on your mind?"
            name="content"
            data-test="create-post-content"
            className={styles.textareaField}
          />
          <div className={styles.errorWrapper}>
            <p
              className={styles.errorMessage}
              data-test="create-post-error-content"
            >
              {errors.content?.message}
            </p>
          </div>
          <div className={styles.btnWrapper}>
            <FormButton btnStyle="submit" type="submit">
              Save
            </FormButton>
          </div>
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
