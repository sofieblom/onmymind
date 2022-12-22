import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./styles.module.scss";
import { SubmitHandler } from "react-hook-form";
import { InputsType, LoginForm } from "./LoginForm";

export const Login = ({ getUser }: LoginProps) => {
  const [id, setId] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<InputsType> = (data: InputsType) => {
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
      <LoginForm onSubmit={onSubmit} />
    </div>
  );
};

interface LoginProps {
  getUser: (id: string, email: string) => void;
}
