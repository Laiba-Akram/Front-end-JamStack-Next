import axios from "axios";

export const makeRequest = axios.create({
  baseURL: process.env.NEXT_APP_API_URL,
  headers: {
    Authorization: "bearer " + process.env.NEXT_PUBLIC_STRAPI_API_TOKEN,
  },
});
