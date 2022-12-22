import { TextField } from "@mui/material";
import { forwardRef } from "react";

export const Input = forwardRef((props, ref) => {
  return (
    <>
      <TextField
        variant="outlined"
        inputRef={ref}
        margin="normal"
        fullWidth
        {...props}
      />
    </>
  );
});
