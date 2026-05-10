import axios from "axios";

// ================= AXIOS INSTANCE ================= //
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

      // ================= GET TOKEN ================= //
      const token =
        localStorage.getItem("jwtToken") ||
        localStorage.getItem("token") ||
        localStorage.getItem("accessToken");

      console.log(
        "🔑 TOKEN:",
        token
      );

      // ================= ATTACH TOKEN ================= //
      if (
        token &&
        token !== "null" &&
        token !== "undefined"
      ) {

        config.headers.Authorization =
          `Bearer ${token}`;

      } else {

        delete config.headers.Authorization;
      }

      // ================= REQUEST LOG ================= //
      console.log(
        "📡 REQUEST:",
        {
          url: config.url,
          method: config.method,
          headers: config.headers,
          data: config.data,
        }
      );

    } catch (err) {

      console.log(
        "❌ TOKEN ERROR:",
        err
      );
    }

    return config;
  },

  (error) => {

    return Promise.reject(error);
  }
);

// ================= RESPONSE INTERCEPTOR ================= //
axiosInstance.interceptors.response.use(

  // ================= SUCCESS ================= //
  (response) => {

    console.log(
      "✅ RESPONSE:",
      response.data
    );

    // IMPORTANT
    // return ONLY DATA
    return response.data;
  },

  // ================= ERROR ================= //
  (error) => {

    console.log(
      "🔥 API ERROR:",
      error
    );

    console.log(
      "❌ STATUS:",
      error.response?.status
    );

    console.log(
      "❌ BACKEND DATA:",
      error.response?.data
    );

    console.log(
      "❌ VALIDATION:",
      error.response?.data?.errors
    );

    // ================= TIMEOUT ================= //
    if (
      error.code ===
      "ECONNABORTED"
    ) {

      return Promise.reject({
        status: 408,
        message:
          "Request timeout. Try again.",
      });
    }

    const status =
      error.response?.status;

    // ================= ERROR MESSAGE ================= //
    let message =
      error.response?.data?.message ||
      error.response?.data?.title ||
      error.message ||
      "Something went wrong";

    // ================= ASP.NET VALIDATION ================= //
    if (
      error.response?.data?.errors
    ) {

      message =
        Object.values(
          error.response.data.errors
        )
          .flat()
          .join(", ");
    }

    // ================= UNAUTHORIZED ================= //
    if (status === 401) {

      console.log(
        "⛔ Unauthorized"
      );

      localStorage.removeItem(
        "jwtToken"
      );

      localStorage.removeItem(
        "token"
      );

      localStorage.removeItem(
        "accessToken"
      );

      if (
        !window.location.pathname.includes(
          "/login"
        )
      ) {

        window.location.href =
          "/login";
      }
    }

    // ================= FORBIDDEN ================= //
    if (status === 403) {

      alert(
        "Access denied."
      );
    }

    // ================= RETURN CLEAN ERROR ================= //
    return Promise.reject({
      status:
        status || 500,

      message,

      originalError: error,
    });
  }
);

export default axiosInstance;