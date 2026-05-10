import axiosInstance from "./axios";

// ================= GET TOKEN =================
const getToken = () => {

  return (

    localStorage.getItem("jwtToken") ||

    localStorage.getItem("token") ||

    ""

  );
};

// ================= SAVE USER LOCALLY =================
const saveUserLocally = (userData) => {

  if (!userData) return;

  localStorage.setItem(
    "userProfile",
    JSON.stringify(userData)
  );

  // ================= LIVE UPDATE =================
  window.dispatchEvent(
    new Event(
      "userProfileUpdated"
    )
  );
};

// ================= AUTH =================

// SIGNUP
export const signupUser = async (
  data
) => {

  const response =
    await axiosInstance.post(
      "/Auth/signup",
      data
    );

  return response;
};

// LOGIN
export const loginUser = async (
  data
) => {

  const response =
    await axiosInstance.post(
      "/Auth/login",
      data
    );

  // ================= SAVE TOKEN =================
  if (response?.token) {

    localStorage.setItem(
      "jwtToken",
      response.token
    );
  }

  // ================= SAVE EMAIL =================
  if (response?.email) {

    localStorage.setItem(
      "userEmail",
      response.email
    );
  }

  // ================= SAVE USER =================
  if (response?.user) {

    saveUserLocally(
      response.user
    );
  }

  return response;
};

// VERIFY EMAIL
export const verifyEmailOtp =
  async (data) => {

    const response =
      await axiosInstance.post(
        "/Auth/verify-email",
        data
      );

    return response;
  };

// ================= PROFILE =================

// SAVE / UPDATE PROFILE
export const saveProfile =
  async (profileData) => {

    const response =
      await axiosInstance.post(
        "/Profile/save-profile",
        profileData,
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        }
      );

    // ================= SAVE LOCALLY =================
    const updatedProfile = {

      ...profileData,

      photoUrl:
        profileData.photoUrl || "",
    };

    saveUserLocally(
      updatedProfile
    );

    return response;
  };

// GET MY PROFILE
export const getMyProfile =
  async () => {

    const response =
      await axiosInstance.get(
        "/Profile/my-profile",
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        }
      );

    // ================= SAVE LOCAL =================
    if (response) {

      saveUserLocally(
        response
      );
    }

    return response;
  };

// GET ALL USERS
export const getAllUsers =
  async () => {

    const response =
      await axiosInstance.get(
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
export const swipeUser =
  async (data) => {

    const response =
      await axiosInstance.post(
        "/Profile/swipe",
        data,
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        }
      );

    // ================= SAVE LIKES =================
    if (data?.isLike) {

      const likedUsers =
        JSON.parse(
          localStorage.getItem(
            "likedUsers"
          )
        ) || [];

      localStorage.setItem(
        "likedUsers",
        JSON.stringify(
          likedUsers
        )
      );
    }

    return response;
  };

// ================= LOGOUT =================
export const logoutUser = () => {

  localStorage.removeItem(
    "jwtToken"
  );

  localStorage.removeItem(
    "token"
  );

  localStorage.removeItem(
    "userProfile"
  );

  localStorage.removeItem(
    "matches"
  );

  localStorage.removeItem(
    "likedUsers"
  );

  window.dispatchEvent(
    new Event(
      "userProfileUpdated"
    )
  );
};