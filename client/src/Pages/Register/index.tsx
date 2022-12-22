import axios from "axios";
import { SubmitHandler } from "react-hook-form";
import { Form } from "./Form";
import styles from "./styles.module.scss";
import { IFormInputs } from "./Form";

export const Register = () => {
  const onSubmit: SubmitHandler<IFormInputs> = (data: any) => {
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
        <Form onSubmit={onSubmit} />
      </div>
    </div>
  );
};
