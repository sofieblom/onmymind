import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import styles from "./styles.module.scss";
import { SubmitButton } from "../../../components/Button";
import xmark from "../../../assets/xmark.svg";
import { useNavigate } from "react-router-dom";

const schema = yup.object().shape({
  firstname: yup.string().required(),
  lastname: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().min(6).required(),
  repeatPassword: yup.string().oneOf([yup.ref("password"), null]),
});

export const RegisterForm = ({ onSubmit, emailError }: FormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IFormInputs>({
    resolver: yupResolver(schema),
  });
  const navigate = useNavigate();

  const handleData = (data: IFormInputs) => {
    if (data) {
      onSubmit(data);
      reset();
    }
  };

  const handleOnClick = () => {
    navigate("/");
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <img
          src={xmark}
          width={20}
          className={styles.img}
          onClick={handleOnClick}
        />
      </div>
      <form
        onSubmit={handleSubmit(handleData)}
        className={styles.formContainer}
      >
        <input
          {...register("firstname")}
          placeholder="Firstname"
          name="firstname"
          type="text"
        />
        <div className={styles.errorWrapper}>
          <p className={styles.error}>{errors.firstname?.message}</p>
        </div>

        <input
          {...register("lastname")}
          placeholder="Lastname"
          name="lastname"
          type="text"
        />
        <div className={styles.errorWrapper}>
          <p className={styles.error}>{errors.lastname?.message}</p>
        </div>
        <input
          {...register("email")}
          placeholder="Email"
          name="email"
          type="text"
        />
        <div className={styles.errorWrapper}>
          {emailError && !errors.email?.message && (
            <p className={styles.Emailerror}>{emailError}</p>
          )}
          <p className={styles.error}>{errors.email?.message}</p>
        </div>

        <input
          {...register("password")}
          placeholder="Password"
          name="password"
          type="password"
        />
        <div className={styles.errorWrapper}>
          <p className={styles.error}>
            {errors.password?.message ||
              (errors.repeatPassword && "Passwords must match")}
          </p>
        </div>
        <input
          {...register("repeatPassword")}
          placeholder="Repeat password"
          name="repeatPassword"
          type="password"
        />
        <div className={styles.errorWrapper}>
          <p className={styles.error}>
            {errors.password?.message ||
              (errors.repeatPassword && "Passwords must match")}
          </p>
        </div>
        <SubmitButton>Create account</SubmitButton>
      </form>
    </div>
  );
};

export interface IFormInputs {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  repeatPassword?: string;
}
interface FormProps {
  onSubmit: (data: IFormInputs) => void;
  emailError?: string;
}
