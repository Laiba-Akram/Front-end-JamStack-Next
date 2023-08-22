// utils/auth.js

import Cookies from "js-cookie";

// Set the authentication token in a cookie
export const setAuthToken = (token) => {
  Cookies.set("token", token, { expires: 7 }); // Set the token with a 7-day expiration
};

// Get the authentication token from the cookie
export const getAuthToken = () => {
  return Cookies.get("token");
};

// Remove the authentication token from the cookie
export const removeAuthToken = () => {
  Cookies.remove("token");
};
