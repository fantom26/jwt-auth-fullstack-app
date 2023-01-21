import { FC } from "react";

import { TextField, TextFieldProps } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

type InputProps = {
  name: string;
};

export const ControlledInput: FC<InputProps & TextFieldProps> = (props) => {
  // **Props
  const { name, defaultValue = "", ...params } = props;

  // **Form
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <TextField
          onChange={onChange}
          value={value}
          error={!!error}
          helperText={error?.message}
          inputProps={{
            ...params.inputProps,
            autoComplete: "new-password"
          }}
          name={name}
          {...params}
        />
      )}
    />
  );
};
