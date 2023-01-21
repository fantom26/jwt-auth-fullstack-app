import axios, { AxiosHeaders } from "axios";
import { REACT_APP_BASE_URL } from "utils/constants";
import { AuthResponse } from "utils/declarations";

export const $api = axios.create({
  baseURL: REACT_APP_BASE_URL,
  withCredentials: true,
  timeout: 300000,
  headers: { "Content-Type": "application/json" }
});

$api.interceptors.request.use((config) => {
  if (config.headers) (config.headers as AxiosHeaders).set("Authorization", `Bearer ${localStorage.getItem("token")}`);
  return config;
});

$api.interceptors.response.use(
  (config) => config,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && originalRequest && !originalRequest._isRetry) {
      originalRequest._isRetry = true;
      try {
        const response = await axios.get<AuthResponse>(`${REACT_APP_BASE_URL}/refresh`, { withCredentials: true });
        localStorage.setItem("token", response.data.accessToken);
        return $api.request(originalRequest);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log("Non authorized");
      }
    }
    throw error;
  }
);
