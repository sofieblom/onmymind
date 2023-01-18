import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Button from "@mui/material/Button";

const styles = {
  backgroundColor: "#c32c2c",
  "&:hover": { backgroundColor: "#cc3636" },
  minWidth: "120px",
  marginTop: "8px",
  crusor: "pointer",
};

export const DeletePost = () => {
  const params = useParams();
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const handleDelete = () => {
    axios
      .delete(`http://localhost:5000/posts/delete/${params.id}`, {
        headers: { "x-api-token": token },
      })
      .then(() => {
        navigate("/home");
      });
  };

  return (
    <Button
      variant="contained"
      type="button"
      sx={styles}
      onClick={handleDelete}
    >
      Delete
    </Button>
  );
};
