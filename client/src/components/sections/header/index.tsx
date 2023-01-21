import { useContext } from "react";

import { AppBar, Box, Button, Container, Link as MuiLink, Stack } from "@mui/material";
import { Context } from "index";
import { observer } from "mobx-react-lite";
import Image from "mui-image";
import { Link as RouterLink } from "react-router-dom";
import { REACT_APP_URI } from "utils/constants";

import { Profile } from "./components/profile";

export const Header = observer(() => {
  const { store } = useContext(Context);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ paddingBlock: "10px" }}>
        <Container>
          <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2} sx={{ flexGrow: 1 }}>
            <MuiLink component={RouterLink} to="/">
              <Image
                src={`${REACT_APP_URI}/images/logo.svg`}
                duration={0}
                shift={null}
                distance="200px"
                shiftDuration={0}
                errorIcon={false}
                showLoading={false}
                easing="linear"
                height="64"
                width="200"
                fit="cover"
                bgColor="inherit"
              />
            </MuiLink>
            {store.authStore.isAuth ? (
              <Profile />
            ) : (
              <>
                <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
                  <Button color="inherit" component={RouterLink} to="/sign-in" size="medium" variant="outlined">
                    Log in
                  </Button>
                  <Button color="secondary" component={RouterLink} to="/sign-up" size="medium" variant="contained">
                    Sign up
                  </Button>
                </Stack>
              </>
            )}
          </Stack>
        </Container>
      </AppBar>
    </Box>
  );
});
