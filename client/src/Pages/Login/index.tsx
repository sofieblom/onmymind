import userEvent from "@testing-library/user-event";
import axios from "axios";
import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import styles from "./styles.module.scss";

interface Inputs {
  email: string;
  password: string;
}

export const Login = ({ getUser }: LoginProps) => {
  const [passwordError, setPasswordError] = useState(false);
  const [id, setId] = useState("");
  const [email, setEmail] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const navigate = useNavigate();

  console.log("user from login", id, email);
  const onSubmit: SubmitHandler<Inputs> = (data: any) => {
    if (data.email && data.password) {
      const user = {
        email: data.email,
        password: data.password,
      };

      axios.post("http://localhost:5000/user/login", user).then((response) => {
        localStorage.setItem("token", response.data.token);
        console.log("RESPONSE", response);
        setId(response.data._id);
        setEmail(response.data.email);
        navigate("/home");
      });
    }
  };

  useEffect(() => {
    getUser(id, email);
  }, [onSubmit]);

  return (
    <div className={styles.contianer}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.formContainer}>
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
        <input type="submit" value="Log in" />
      </form>
    </div>
  );
};

interface ResponseType {
  _id: string;
  email: string;
  token: string;
}

interface LoginProps {
  getUser: (id: string, email: string) => void;
}
