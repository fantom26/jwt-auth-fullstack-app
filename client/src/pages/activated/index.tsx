import { FC } from "react";

import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Box, Breadcrumbs, Container, Link as MuiLink, Typography } from "@mui/material";
import { observer } from "mobx-react-lite";
import Confetti from "react-confetti";
import { Link as RouterLink } from "react-router-dom";
import useWindowSize from "react-use/lib/useWindowSize";

const breadcrumbs = [
  <MuiLink underline="hover" key="1" color="inherit" component={RouterLink} to="/">
    Home
  </MuiLink>,
  <Typography key="2" color="text.primary">
    Activated
  </Typography>
];

const Activated: FC = () => {
  const { width, height } = useWindowSize();
  return (
    <>
      <Confetti width={width} height={height} recycle={false} />

      <Container>
        <Box sx={{ marginTop: 3 }}>
          <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
            {breadcrumbs}
          </Breadcrumbs>
          <Typography variant="h3">You successfully activated your account!</Typography>
        </Box>
      </Container>
    </>
  );
};

export default observer(Activated);
