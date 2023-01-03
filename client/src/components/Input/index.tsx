import { TextField } from "@mui/material";
import { forwardRef } from "react";

export const Input = forwardRef(({ props, ref }: any) => {
  return (
    <>
      <TextField
        variant="outlined"
        inputRef={ref}
        margin="normal"
        label="Title"
        fullWidth
        {...props}
      />
    </>
  );
});

export const TextArea = forwardRef(({ props, ref }: any) => {
  return (
    <>
      <TextField
        variant="outlined"
        inputRef={ref}
        margin="normal"
        label="What's on your mind?"
        multiline
        rows={10}
        fullWidth
        {...props}
      />
    </>
  );
});
