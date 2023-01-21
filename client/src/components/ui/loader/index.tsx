import { CircularProgress, Container, Stack } from "@mui/material";

export const Loader = () => (
  <Container>
    <Stack alignItems="center" justifyContent="center" spacing={5}>
      <CircularProgress size={100} color="info" />
    </Stack>
  </Container>
);
