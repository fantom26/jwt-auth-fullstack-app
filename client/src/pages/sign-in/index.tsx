import { useContext } from "react";

import { yupResolver } from "@hookform/resolvers/yup";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { LoadingButton } from "@mui/lab";
import { Avatar, Box, Container, Grid, IconButton, InputAdornment, Link as MuiLink, Typography } from "@mui/material";
import { Form } from "components/form";
import { Copyright } from "components/ui";
import { useRequest, useShowPassword } from "hooks";
import { Context } from "index";
import { observer } from "mobx-react-lite";
import { useForm } from "react-hook-form";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { AuthService } from "services";
import { LoginObject, LoginSchema } from "utils/schemas";

const SignIn = () => {
  const navigate = useNavigate();
  const { handleRequest } = useRequest();
  const { store } = useContext(Context);

  const { showPassword, handleClickShowPassword, handleMouseDownPassword } = useShowPassword();

  const methods = useForm<LoginSchema>({
    mode: "onSubmit",
    resolver: yupResolver(LoginObject)
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
    reset
  } = methods;

  const onSubmit = handleRequest(async (data: LoginSchema) => {
    const response = await AuthService.login(data);

    if (response.status <= 200 && response.status > 299) {
      throw new Error();
    }

    store.authStore.registration(response);
    reset();
    navigate("/");
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
          Sign in
        </Typography>
        <Form methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Form.Input margin="normal" fullWidth type="email" label="Email Address" name="email" />
          <Form.Input
            margin="normal"
            fullWidth
            label="Password"
            type={showPassword ? "text" : "password"}
            name="password"
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
          <LoadingButton type="submit" fullWidth loading={isSubmitting} variant="contained" sx={{ mt: 3, mb: 2 }}>
            Sign In
          </LoadingButton>
          <Grid container>
            {/* <Grid item xs>
                <MuiLink href="#" variant="body2">
                  Forgot password?
                </MuiLink>
              </Grid> */}
            <Grid item>
              <MuiLink component={RouterLink} to="/sign-up" variant="body2" color="#06c">
                {"Don't have an account? Sign Up"}
              </MuiLink>
            </Grid>
          </Grid>
        </Form>
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  );
};

export default observer(SignIn);
