import { yupResolver } from "@hookform/resolvers/yup";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { LoadingButton } from "@mui/lab";
import { Avatar, Box, Container, Grid, IconButton, InputAdornment, Link as MuiLink, Typography } from "@mui/material";
import { Form } from "components/form";
import { Copyright } from "components/ui";
import { useRequest, useShowPassword } from "hooks";
import { observer } from "mobx-react-lite";
import { useForm } from "react-hook-form";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { AuthService } from "services";
import { disableCopyInputValue } from "utils/helpers";
import { RegisterObject, RegisterSchema } from "utils/schemas";

const SignUp = () => {
  const { handleRequest } = useRequest();
  const { showPassword, handleClickShowPassword, handleMouseDownPassword } = useShowPassword();
  const {
    showPassword: showConfirmPassword,
    handleClickShowPassword: handleClickShowConfirmPassword,
    handleMouseDownPassword: handleMouseDownConfirmPassword
  } = useShowPassword();

  const navigate = useNavigate();

  const methods = useForm<RegisterSchema>({
    mode: "onSubmit",
    resolver: yupResolver(RegisterObject)
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
    reset
  } = methods;

  const onSubmit = handleRequest(async (data: RegisterSchema) => {
    const response = await AuthService.registration(data);

    if (response.status <= 200 && response.status > 299) {
      throw new Error();
    }

    reset();
    navigate("/sign-in");
  });

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Form methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Form.Input margin="normal" fullWidth id="firstName" label="First name" name="firstName" />
          <Form.Input margin="normal" fullWidth id="lastName" label="Last name" name="lastName" />
          <Form.Input margin="normal" fullWidth id="email" label="Email Address" name="email" />
          <Form.Input
            margin="normal"
            fullWidth
            label="Password"
            type={showPassword ? "text" : "password"}
            name="password"
            onCut={disableCopyInputValue}
            onCopy={disableCopyInputValue}
            onPaste={disableCopyInputValue}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton aria-label="toggle password visibility" onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword}>
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
          <Form.Input
            margin="normal"
            fullWidth
            label="Confirm Password"
            type={showConfirmPassword ? "text" : "password"}
            name="confirmPassword"
            onCut={disableCopyInputValue}
            onCopy={disableCopyInputValue}
            onPaste={disableCopyInputValue}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton aria-label="toggle password visibility" onClick={handleClickShowConfirmPassword} onMouseDown={handleMouseDownConfirmPassword}>
                    {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
          <LoadingButton type="submit" fullWidth loading={isSubmitting} variant="contained" sx={{ mt: 3, mb: 2 }}>
            Sign Up
          </LoadingButton>
        </Form>
        <Grid container>
          <Grid item>
            <MuiLink component={RouterLink} to="/sign-in" variant="body2" color="#06c">
              Already have an account? Sign in
            </MuiLink>
          </Grid>
        </Grid>
      </Box>
      <Copyright sx={{ mt: 5 }} />
    </Container>
  );
};

export default observer(SignUp);
