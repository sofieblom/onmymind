import userEvent from "@testing-library/user-event";
import axios from "axios";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import styles from "./styles.module.scss";

interface Inputs {
  email: string;
  password: string;
}

export const Login = () => {
  const [passwordError, setPasswordError] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<Inputs> = (data: any) => {
    if (data.email && data.password) {
      const user = {
        email: data.email,
        password: data.password,
      };
      axios.post("http://localhost:5000/user/login", user).then((response) => {
        navigate("/posts");
      });
    }
  };

  return (
    <div>
      <div className={styles.contianer}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={styles.formContainer}
        >
          <input
            {...register("email", {
              required: true,
              pattern: {
                value:
                  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                message: "Invalid email address",
              },
            })}
            placeholder="Email"
            name="email"
            type="text"
          />
          {errors.email?.type === "required" ? (
            <p>Email is required</p>
          ) : (
            errors.email && <p>{errors.email.message}</p>
          )}
          <input
            {...register("password", { required: true, min: 6 })}
            placeholder="password"
            name="password"
            type="password"
          />
          <input type="submit" value="Create account" />
        </form>
      </div>
    </div>
  );
};
