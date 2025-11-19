import axios from "axios";

const useProxy = import.meta.env.VITE_USE_PROXY === "true";
const baseURL = useProxy ? "/api" : import.meta.env.VITE_API_BASE_URL || "/";

export const apiClient = axios.create({
  baseURL,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);
