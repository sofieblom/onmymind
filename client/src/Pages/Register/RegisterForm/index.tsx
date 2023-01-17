import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import styles from "./styles.module.scss";
import { FormButton } from "../../../components/Button";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

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
    }
  };

  return (
    <div className={styles.container}>
      <form
        onSubmit={handleSubmit(handleData)}
        className={styles.formContainer}
        data-test="register-form"
      >
        <input
          {...register("firstname")}
          placeholder="Firstname"
          name="firstname"
          type="text"
          data-test="firstname-input"
        />
        <div className={styles.errorWrapper}>
          <p className={styles.error} data-test="firstname-input-error">
            {errors.firstname?.message}
          </p>
        </div>

        <input
          {...register("lastname")}
          placeholder="Lastname"
          name="lastname"
          type="text"
          data-test="lastname-input"
        />
        <div className={styles.errorWrapper}>
          <p className={styles.error} data-test="lastname-input-error">
            {errors.lastname?.message}
          </p>
        </div>
        <input
          {...register("email")}
          placeholder="Email"
          name="email"
          type="text"
          data-test="email-input"
        />
        <div className={styles.errorWrapper}>
          {emailError && !errors.email?.message && (
            <p className={styles.Emailerror}>{emailError}</p>
          )}
          <p className={styles.error} data-test="email-input-error">
            {errors.email?.message}
          </p>
        </div>

        <input
          {...register("password")}
          placeholder="Password"
          name="password"
          type="password"
          data-test="password-input"
        />
        <div className={styles.errorWrapper}>
          <p className={styles.error} data-test="password-input-error">
            {errors.password?.message ||
              (errors.repeatPassword && "Passwords must match")}
          </p>
        </div>
        <input
          {...register("repeatPassword")}
          placeholder="Repeat password"
          name="repeatPassword"
          type="password"
          data-test="repeat-password-input"
        />
        <div className={styles.errorWrapper}>
          <p className={styles.error} data-test="repeatpassword-input-error">
            {errors.password?.message ||
              (errors.repeatPassword && "Passwords must match")}
          </p>
        </div>
        <div className={styles.btnWrapper}>
          <FormButton btnStyle="cancel" onClick={() => navigate("/")}>
            Cancel
          </FormButton>
          <FormButton btnStyle="submit">Create account</FormButton>
        </div>
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
