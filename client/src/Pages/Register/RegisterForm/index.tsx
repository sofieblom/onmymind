import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import styles from "./styles.module.scss";

const schema = yup.object().shape({
  firstname: yup.string().required(),
  lastname: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().min(6).required(),
  repeatPassword: yup.string().oneOf([yup.ref("password"), null]),
});

export const RegisterForm = ({ onSubmit }: FormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInputs>({
    resolver: yupResolver(schema),
  });

  const handleData = (data: IFormInputs) => {
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(handleData)} className={styles.formContainer}>
      <input
        {...register("firstname")}
        placeholder="Firstname"
        name="firstname"
        type="text"
      />
      <p>{errors.firstname?.message}</p>

      <input
        {...register("lastname")}
        placeholder="Lastname"
        name="lastname"
        type="text"
      />
      <p>{errors.lastname?.message}</p>
      <input
        {...register("email")}
        placeholder="Email"
        name="email"
        type="text"
      />
      <p>{errors.email?.message}</p>

      <input
        {...register("password")}
        placeholder="password"
        name="password"
        type="password"
      />
      <input
        {...register("repeatPassword")}
        placeholder="Repeat password"
        name="repeatPassword"
        type="password"
      />
      <p>
        {errors.password?.message ||
          (errors.repeatPassword && "Passwords must match")}
      </p>

      <input type="submit" value="Create account" />
    </form>
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
}
