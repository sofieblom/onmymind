import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./styles.module.scss";
import { SubmitHandler } from "react-hook-form";
import { InputsType, LoginForm } from "./LoginForm";

export const Login = () => {
  const [authEmailError, setAuthEmailError] = useState();
  const [authPasswordError, setAuthPasswordError] = useState();

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<InputsType> = async (data: InputsType) => {
    if (data.email && data.password) {
      const user = {
        email: data.email,
        password: data.password,
      };

      await axios
        .post("http://localhost:5000/user/login", user)
        .then((response) => {
          if (response.status === 200) {
            localStorage.setItem("token", response.data.token);
            navigate("/home");
          }
        })
        .catch((error) => {
          setAuthEmailError(error.response.data.emailError);
          setAuthPasswordError(error.response.data.passwordError);
          console.log("ERROR", error);
        });
    }
  };

  return (
    <div className={styles.contianer}>
      <h1 className={styles.heading}>Journal of today</h1>
      <LoginForm
        onSubmit={onSubmit}
        authEmailError={authEmailError}
        authPasswordError={authPasswordError}
      />
    </div>
  );
};
