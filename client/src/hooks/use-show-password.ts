import { useState } from "react";

export const useShowPassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);

  return {
    showPassword,
    handleClickShowPassword,
    handleMouseDownPassword
  };
};
