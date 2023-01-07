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
// import { Input } from "../../../components/Input";

export const schema = yup.object().shape({
  title: yup.string().min(3).max(30).required("Don't leave this field empty"),
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
  const [showCalendar, setShowCalendar] = useState<boolean>(false);

  // RENDER COUNT
  let renderCount = 0;
  renderCount++;
  console.log("RENDERCOUNT CREATE POST", renderCount);

  const handleData = (data: IFormPostInputs) => {
    onSubmit(data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(handleData)} className={styles.formContainer}>
      <input
        {...register("title")}
        placeholder="Title"
        name="title"
        type="text"
      />

      {/* <Input
        ref={register}
        type="text"
        name="title"
        error={!!errors.title}
        helperText={errors?.title?.message}
      /> */}

      {/* <Controller
        control={control}
        name="title"
        rules={{ required: true }}
        render={({ field: { onChange } }) => (
          <TextField
            id="standard-basic"
            label="Standard"
            variant="standard"
            onChange={onChange}
          />
        )}
      /> */}
      <p>{errors.title?.message}</p>
      {/* <input {...register("creationDate")} name="creationDate" type="date" /> */}

      {/* <img
        src={calendar}
        width={20}
        onClick={() => setShowCalendar((showCalendar) => !showCalendar)}
      /> */}
      {/* {showCalendar && (
        <Controller
          control={control}
          name="creationDate"
          rules={{ required: "You have to choose a date" }}
          render={({ field: { onChange } }) => <Calendar onChange={onChange} />}
        />
      )} */}
      <input {...register("creationDate")} name="creationDate" type="date" />

      <textarea
        {...register("content")}
        placeholder="What's on your mind?"
        name="content"
      />
      {/* <TextArea
        ref={register}
        type="text"
        name="content"
        error={!!errors.title}
        helperText={errors?.title?.message}
      /> */}
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
