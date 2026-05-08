import axiosInstance from "./axios";

// ================= GET TOKEN =================
const getToken = () => {
  return (
    localStorage.getItem("jwtToken") ||
    localStorage.getItem("token") ||
    ""
  );
};

// ================= AUTH =================

// SIGNUP
export const signupUser = async (data) => {
  const response = await axiosInstance.post(
    "/Auth/signup",
    data
  );

  return response;
};

// LOGIN
export const loginUser = async (data) => {
  const response = await axiosInstance.post(
    "/Auth/login",
    data
  );

  // SAVE TOKEN
  if (response?.token) {
    localStorage.setItem(
      "jwtToken",
      response.token
    );
  }

  // SAVE EMAIL
  if (response?.email) {
    localStorage.setItem(
      "userEmail",
      response.email
    );
  }

  return response;
};

// VERIFY EMAIL
export const verifyEmailOtp = async (data) => {
  const response = await axiosInstance.post(
    "/Auth/verify-email",
    data
  );

  return response;
};

// ================= PROFILE =================

// SAVE / UPDATE PROFILE
export const saveProfile = async (profileData) => {
  const response = await axiosInstance.post(
    "/Profile/save-profile",
    profileData,
    {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    }
  );

  return response;
};

// GET MY PROFILE
export const getMyProfile = async () => {
  const response = await axiosInstance.get(
    "/Profile/my-profile",
    {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    }
  );

  return response;
};

// GET ALL USERS
export const getAllUsers = async () => {
  const response = await axiosInstance.get(
    "/Profile/users",
    {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    }
  );

  return response;
};

// SWIPE USER
export const swipeUser = async (data) => {
  const response = await axiosInstance.post(
    "/Profile/swipe",
    data,
    {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    }
  );

  return response;
};