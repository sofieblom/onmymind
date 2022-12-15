import axios from "axios";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import styles from "./styles.module.scss";

interface Inputs {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  repeatPassword?: string;
}

export const Register = () => {
  const [passwordError, setPasswordError] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data: any) => {
    setPasswordError(false);

    if (data.password === data.repeatPassword) {
      const registerUser: Inputs = {
        firstname: data.firstname,
        lastname: data.lastname,
        email: data.email,
        password: data.password,
      };
      axios
        .post("http://localhost:5000/user/register", registerUser)
        .then((response) => {
          console.log(response.data);
        });
    } else {
      setPasswordError(true);
    }
  };

  const requiredPassword = errors.password?.type || errors.repeatPassword?.type;

  return (
    <div>
      <div className={styles.contianer}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={styles.formContainer}
        >
          <input
            {...register("firstname", {
              required: true,
            })}
            aria-invalid={errors.firstname ? "true" : "false"}
            placeholder="Firstname"
            name="firstname"
            type="text"
          />
          {errors.lastname?.type === "required" && <p>Lastname is required</p>}

          <input
            {...register("lastname", {
              required: true,
            })}
            placeholder="Lastname"
            name="lastname"
            type="text"
          />
          {errors.lastname?.type === "required" && <p>Lastname is required</p>}
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
          <input
            {...register("repeatPassword", { required: true, min: 6 })}
            placeholder="Repeat password"
            name="repeatPassword"
            type="password"
          />
          {passwordError && <p>Passwords must match</p>}
          {requiredPassword === "required" && <p>You must choose a password</p>}
          <input type="submit" value="Create account" />
        </form>
      </div>
    </div>
  );
};
