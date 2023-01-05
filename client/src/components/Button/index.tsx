import Button from "@mui/material/Button";
import React from "react";

interface ButtonProps {
  children?: React.ReactNode;
}

const styles = {
  backgroundColor: "#8caa91",
  "&:hover": { backgroundColor: "#9ebda3" },
  minWidth: "120px",
  marginTop: "8px",
  crusor: "pointer",
};

export const SubmitButton = ({ children }: ButtonProps) => {
  return (
    <Button variant="contained" type="submit" sx={styles}>
      {children}
    </Button>
  );
};