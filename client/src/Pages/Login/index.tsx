import axios from "axios";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
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

  const onSubmit: SubmitHandler<Inputs> = (data: any) => {
    // setPasswordError(false);
    // if (data.password === data.repeatPassword) {
    //   const registerUser: Inputs = {
    //     email: data.email,
    //     password: data.password,
    //   };
    //   axios
    //     .post("http://localhost:5000/user/", registerUser)
    //     .then((response) => {
    //       console.log(response.data);
    //     });
    // } else {
    //   setPasswordError(true);
    // }
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
        </form>
      </div>
    </div>
  );
};
