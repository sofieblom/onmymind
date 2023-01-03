import styles from "./styles.module.scss";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link } from "react-router-dom";
// import { Input } from "../../../components/Input/Input";

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
    <div className={styles.container}>
      <form
        onSubmit={handleSubmit(handleData)}
        className={styles.formContainer}
      >
        <input
          {...register("email")}
          placeholder="Enter email..."
          name="email"
          type="text"
          className={styles.input}
        />

        <p className={styles.error}> {errors.email?.message}</p>

        <input
          {...register("password")}
          placeholder="Enter password..."
          name="password"
          type="password"
          className={styles.input}
        />
        <p className={styles.error}>{errors.password?.message}</p>
        <input type="submit" value="Log in" />
      </form>
      <p className={styles.createAccount}>
        Don't have an account? Create one
        <Link to="/register" className={styles.link}>
          {" "}
          here
        </Link>
      </p>
    </div>
  );
};

export interface InputsType {
  email: string;
  password: string;
}

interface LoginFormProps {
  onSubmit: (data: InputsType) => void;
}
