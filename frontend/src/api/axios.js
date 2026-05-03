import axios from "axios";

// ================= BASE CONFIG ================= //
const axiosInstance = axios.create({
  baseURL: "http://localhost:5240/api", // ✅ backend port
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 20000,
});

// ================= REQUEST INTERCEPTOR ================= //
axiosInstance.interceptors.request.use(
  (config) => {
    try {
      const token =
        localStorage.getItem("jwtToken") ||
        localStorage.getItem("token") ||
        localStorage.getItem("accessToken");

      // 🔒 attach token only if valid
      if (token && token !== "null" && token !== "undefined") {
        config.headers.Authorization = `Bearer ${token}`;
      } else {
        delete config.headers.Authorization;
      }
    } catch (err) {
      console.error("❌ Token error:", err);
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// ================= RESPONSE INTERCEPTOR ================= //
axiosInstance.interceptors.response.use(
  (response) => response.data, // ✅ IMPORTANT FIX (direct data return)

  (error) => {
    console.error("🔥 API ERROR FULL:", error);

    // ⏰ TIMEOUT
    if (error.code === "ECONNABORTED") {
      return Promise.reject({
        status: 408,
        message: "Request timeout. Try again.",
      });
    }

    const status = error.response?.status;

    const message =
      error.response?.data?.message ||
      error.response?.data?.title ||
      error.message ||
      "Something went wrong";

    // ================= ERROR HANDLING ================= //

    if (status === 401) {
      const isGuest = localStorage.getItem("userType") === "guest";

      if (!isGuest) {
        localStorage.removeItem("jwtToken");
        localStorage.removeItem("token");
        localStorage.removeItem("accessToken");

        if (!window.location.pathname.includes("/login")) {
          window.location.href = "/login";
        }
      }
    }

    if (status === 403) {
      alert("Access denied.");
    }

    return Promise.reject({
      status: status || 500,
      message,
      originalError: error,
    });
  }
);

export default axiosInstance;