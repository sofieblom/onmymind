import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export const DeletePost = () => {
  const params = useParams();
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const handleDelete = () => {
    console.log("delete");
    axios
      .delete(`http://localhost:5000/posts/delete/${params.id}`, {
        headers: { "x-api-token": token },
      })
      .then((response) => {
        navigate("/home");
      });
  };

  return <button onClick={handleDelete}>Delete</button>;
};
