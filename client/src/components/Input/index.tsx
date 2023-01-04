import { TextField } from "@mui/material";
import { grey } from "@mui/material/colors";
import { forwardRef } from "react";

const styles = {
  backgroundColor: grey,
};

interface Input {
  placeholder: string;
  name: string;
  type: string;
}

export const InputField = ({ placeholder, name, type }: Input) => {
  return <input placeholder={placeholder} name={name} type={type} />;
};

export const Input = forwardRef(({ props }: any) => {
  return (
    <>
      <TextField
        variant="outlined"
        // inputRef={ref}
        error={props.error}
        margin="normal"
        label={props.label}
        fullWidth
        sx={styles}
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
