import axios from "axios";
import { assign } from "lodash";

export const httpRequest = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

httpRequest.interceptors.request.use((request) => {
  const accessToken = localStorage.getItem("access_token");
  const configHeader = {
    headers: {
      ContentType: `application/json`,
      Authorization: `Bearer ${accessToken}`,
    },
  };
  assign(request, configHeader);
  return request;
});
