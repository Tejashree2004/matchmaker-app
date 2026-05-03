import axiosInstance from "./axios";

export const signupUser = (data) =>
  axiosInstance.post("/Auth/signup", data);

export const loginUser = (data) =>
  axiosInstance.post("/Auth/login", data);

export const verifyEmailOtp = (data) =>
  axiosInstance.post("/Auth/verify-email", data);