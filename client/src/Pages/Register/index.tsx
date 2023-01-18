import axios from "axios";
import { SubmitHandler } from "react-hook-form";
import { RegisterForm } from "./RegisterForm";
import styles from "./styles.module.scss";
import { IFormInputs } from "./RegisterForm";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Register = () => {
  const [emailError, setEmailError] = useState();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<IFormInputs> = async (data: IFormInputs) => {
    if (
      data.firstname &&
      data.lastname &&
      data.email &&
      data.password &&
      data.repeatPassword
    ) {
      const registerUser: IFormInputs = {
        firstname: data.firstname,
        lastname: data.lastname,
        email: data.email,
        password: data.password,
      };
      await axios
        .post("http://localhost:5000/user/register", registerUser)
        .then((response) => {
          if (response.status === 200) {
            navigate("/");
          }
        })
        .catch((error) => {
          setEmailError(error.response.data.email);
          console.log(error);
        });
    }
  };

  return (
    <div>
      <div className={styles.contianer}>
        <h1 className={styles.heading}>Journal of today</h1>

        <RegisterForm onSubmit={onSubmit} emailError={emailError} />
      </div>
    </div>
  );
};
