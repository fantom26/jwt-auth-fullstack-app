import { useSnackbar } from "notistack";

export const useRequest = () => {
  const { enqueueSnackbar } = useSnackbar();

  const handleRequest =
    (callback: any) =>
    async (...args: any) => {
      try {
        await callback(...args);
      } catch (error: any) {
        enqueueSnackbar(error.response.data.message || error?.message, {
          variant: "error",
          preventDuplicate: true
        });
      }
    };

  return { handleRequest };
};
