import { FC, useContext } from "react";

import { Button, Container } from "@mui/material";
import { Loader } from "components/ui";
import { Context } from "index";
import { observer } from "mobx-react-lite";
import { useSnackbar } from "notistack";

import { UsersTable } from "./components/users-table";

const Home: FC = () => {
  const { store } = useContext(Context);
  const { enqueueSnackbar } = useSnackbar();

  const getUsersHandler = () => {
    if (!store.authStore.isAuth) {
      enqueueSnackbar("You cannot get users, because you aren't authorized", {
        variant: "error",
        preventDuplicate: true
      });
    }

    store.usersStore.getUsers();
  };

  return (
    <>
      <Container>
        <Button variant="contained" onClick={getUsersHandler} sx={{ marginTop: 3 }}>
          Get users
        </Button>
        {store.usersStore.users.length > 0 && store.authStore.isAuth && <>{store.usersStore.isLoading ? <Loader /> : <UsersTable />}</>}
      </Container>
    </>
  );
};

export default observer(Home);
