import axios from "axios";
import { SubmitHandler } from "react-hook-form";
import { RegisterForm } from "./RegisterForm";
import styles from "./styles.module.scss";
import { IFormInputs } from "./RegisterForm";

export const Register = () => {
  const onSubmit: SubmitHandler<IFormInputs> = (data: IFormInputs) => {
    console.log("data:", data);
    if (data) {
      const registerUser: IFormInputs = {
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
    }
  };

  return (
    <div>
      <div className={styles.contianer}>
        <RegisterForm onSubmit={onSubmit} />
      </div>
    </div>
  );
};
