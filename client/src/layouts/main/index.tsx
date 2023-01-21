import { Suspense, useContext, useEffect } from "react";

import { Header } from "components/sections";
import { Loader } from "components/ui";
import { Context } from "index";
import { Outlet } from "react-router-dom";

export const MainLayout = () => {
  const { store } = useContext(Context);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      store.authStore.checkAuth();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Header />
      {store.authStore.isLoading ? (
        <Loader />
      ) : (
        <Suspense fallback={<Loader />}>
          <Outlet />
        </Suspense>
      )}
    </>
  );
};
