import Button from "@mui/material/Button";
import React from "react";

interface ButtonProps {
  children?: React.ReactNode;
  btnStyle: "submit" | "cancel";
  onClick?: () => void;
}

const styles: Record<string, any> = {
  submit: {
    backgroundColor: "#8caa91",
    "&:hover": { backgroundColor: "#9ebda3" },
    marginTop: "8px",
    minWidth: "120px",
    crusor: "pointer",
  },
  cancel: {
    backgroundColor: "#c32c2c",
    "&:hover": { backgroundColor: "#cc3636" },
    minWidth: "120px",
    crusor: "pointer",
  },
};

export const FormButton = ({ children, btnStyle, onClick }: ButtonProps) => {
  return (
    <Button
      variant="contained"
      type="submit"
      sx={styles[btnStyle]}
      onClick={onClick}
    >
      {children}
    </Button>
  );
};
