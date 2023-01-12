import styles from "./styles.module.scss";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link } from "react-router-dom";
import { FormButton } from "../../../components/Button";
import user from "./user.svg";
import key from "./key.svg";

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(6).required(),
});

export const LoginForm = ({
  onSubmit,
  authEmailError,
  authPasswordError,
}: LoginFormProps) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<InputsType>({
    resolver: yupResolver(schema),
  });

  const handleData = (data: InputsType) => {
    if (data) {
      onSubmit(data);
    }
  };

  return (
    <div className={styles.container}>
      <form
        onSubmit={handleSubmit(handleData)}
        className={styles.formContainer}
      >
        <div className={styles.wrapper}>
          <img src={user} width={20} />
          <input
            {...register("email")}
            placeholder="Enter email..."
            name="email"
            type="text"
            className={styles.input}
          />
        </div>
        <div className={styles.errorWrapper}>
          <p className={styles.error}> {errors.email?.message}</p>
          {authEmailError && !errors.email?.message && (
            <p className={styles.error}>{authEmailError}</p>
          )}
        </div>

        <div className={styles.wrapper}>
          <img src={key} width={20} />

          <input
            {...register("password")}
            placeholder="Enter password..."
            name="password"
            type="password"
            className={styles.input}
          />
        </div>
        <div className={styles.errorWrapper}>
          <p className={styles.error}>{errors.password?.message}</p>
          {authPasswordError && !errors.password?.message && (
            <p className={styles.error}>{authPasswordError}</p>
          )}
        </div>
        <FormButton btnStyle="submit">Log in</FormButton>
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
  authEmailError?: string;
  authPasswordError?: string;
}
