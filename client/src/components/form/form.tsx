import { ReactNode } from "react";

import { Box } from "@mui/material";
import { FormProvider, UseFormReturn } from "react-hook-form";

import { ControlledInput } from "./input";

interface FormProps {
  children: ReactNode;
  methods: UseFormReturn<any>;
  onSubmit: VoidFunction;
}

const Form = (props: FormProps) => {
  // **Props
  const { methods, children, onSubmit } = props;

  return (
    <FormProvider {...methods}>
      <Box component="form" onSubmit={onSubmit} sx={{ mt: 1 }} autoComplete="off">
        {children}
      </Box>
    </FormProvider>
  );
};

Form.Input = ControlledInput;
export { Form };
