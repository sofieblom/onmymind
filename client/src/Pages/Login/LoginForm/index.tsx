import styles from "./styles.module.scss";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Input } from "../../../components/Input/Input";

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(6).required(),
});

export const LoginForm = ({ onSubmit }: LoginFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InputsType>({
    resolver: yupResolver(schema),
  });

  const handleData = (data: InputsType) => {
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(handleData)} className={styles.formContainer}>
      <input
        {...register("email")}
        placeholder="Email"
        name="email"
        type="text"
      />

      <p> {errors.email?.message}</p>

      <input
        {...register("password")}
        placeholder="password"
        name="password"
        type="password"
      />
      <p>{errors.password?.message}</p>
      <input type="submit" value="Log in" />
    </form>
  );
};

export interface InputsType {
  email: string;
  password: string;
}

interface LoginFormProps {
  onSubmit: (data: InputsType) => void;
}
