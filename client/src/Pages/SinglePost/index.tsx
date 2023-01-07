import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { PostType } from "../Home";
import { DeletePost } from "./DeletePost";
import { EditPost } from "./EditPost";
import styles from "./styles.module.scss";
import Button from "@mui/material/Button";

const btnStyles = {
  backgroundColor: "#c9a22d",
  "&:hover": { backgroundColor: "#deba4b" },
  minWidth: "120px",
  marginRight: "8px",
  crusor: "pointer",
};

export const SinglePost = () => {
  let params = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState<PostType>();

  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get(`http://localhost:5000/posts/${params.id}`, {
        headers: { "x-api-token": token },
      })
      .then((response) => {
        if (params.id === response.data._id) {
          setPost(response.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [params]);

  const handleEdit = () => {
    navigate("/post/edit/" + params.id);
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h1>{post?.title}</h1>
        <p>{post?.content}</p>
        <p>{post?.creationDate.split("T")[0]}</p>
        <Button
          variant="contained"
          type="submit"
          sx={btnStyles}
          onClick={handleEdit}
        >
          Edit
        </Button>
        <DeletePost />
      </div>
    </div>
  );
};
