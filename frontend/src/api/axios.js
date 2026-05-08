import axios from "axios";

// ================= BASE CONFIG ================= //
const axiosInstance = axios.create({
  baseURL: "http://localhost:5240/api",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 20000,
});

// ================= REQUEST INTERCEPTOR ================= //
axiosInstance.interceptors.request.use(
  (config) => {
    try {
      // ✅ get token from localStorage
      const token =
        localStorage.getItem("jwtToken") ||
        localStorage.getItem("token") ||
        localStorage.getItem("accessToken");

      console.log("🔑 TOKEN:", token);

      // ✅ attach token
      if (
        token &&
        token !== "null" &&
        token !== "undefined"
      ) {
        config.headers.Authorization = `Bearer ${token}`;
      } else {
        delete config.headers.Authorization;
      }

      console.log("📡 REQUEST:", {
        url: config.url,
        method: config.method,
        headers: config.headers,
        data: config.data,
      });

    } catch (err) {
      console.error("❌ Token error:", err);
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// ================= RESPONSE INTERCEPTOR ================= //
axiosInstance.interceptors.response.use(
  (response) => {
    console.log("✅ RESPONSE:", response.data);

    // IMPORTANT
    return response.data;
  },

  (error) => {
    console.error("🔥 API ERROR FULL:", error);

    // ✅ SHOW FULL BACKEND ERROR
    console.log("❌ STATUS:", error.response?.status);

    console.log("❌ BACKEND DATA:", error.response?.data);

    console.log(
      "❌ VALIDATION ERRORS:",
      error.response?.data?.errors
    );

    // ⏰ TIMEOUT
    if (error.code === "ECONNABORTED") {
      return Promise.reject({
        status: 408,
        message: "Request timeout. Try again.",
      });
    }

    const status = error.response?.status;

    // ✅ BETTER ERROR MESSAGE
    let message =
      error.response?.data?.message ||
      error.response?.data?.title ||
      error.message ||
      "Something went wrong";

    // ✅ ASP.NET VALIDATION ERROR SUPPORT
    if (error.response?.data?.errors) {
      const validationErrors =
        Object.values(error.response.data.errors)
          .flat()
          .join(", ");

      message = validationErrors;
    }

    // ================= AUTH ERROR ================= //
    if (status === 401) {
      console.log("⛔ Unauthorized");

      localStorage.removeItem("jwtToken");
      localStorage.removeItem("token");
      localStorage.removeItem("accessToken");

      if (!window.location.pathname.includes("/login")) {
        window.location.href = "/login";
      }
    }

    // ================= FORBIDDEN ================= //
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