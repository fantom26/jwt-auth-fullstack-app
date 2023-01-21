import { object, ref, string } from "yup";

export const LoginObject = object({
  email: string().required().email(),
  password: string().min(6, "Password should be 6-20 characters").max(20, "Password should be 6-20 characters").required()
});

export const RegisterObject = LoginObject.concat(
  object({
    firstName: string().required(),
    lastName: string().required(),
    confirmPassword: string()
      .label("confirm password")
      .required()
      .oneOf([ref("password"), null], "Passwords must match")
  })
);

export type LoginSchema = ReturnType<typeof LoginObject.validateSync>;
export type RegisterSchema = ReturnType<typeof RegisterObject.validateSync>;
