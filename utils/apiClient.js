import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:8080/promo_kh",
});

apiClient.defaults.headers.common['Api-Token'] = 'scbnsk289248nscsndk298km';

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response && error.response.status === 403) {
      const refreshToken = localStorage.getItem("refreshToken");

      if (refreshToken) {
        try {
          const response = await apiClient.post("/auth/access-token", {
            refreshToken,
          });

          const { accessToken } = response.data.data;

          apiClient.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${accessToken}`;

          originalRequest.headers["Authorization"] = `Bearer ${accessToken}`;

          return apiClient(originalRequest);
        } catch (error) {
          localStorage.removeItem("refreshToken");
          localStorage.removeItem("accessToken");
          window.location.href = "/unauthorized";
        }
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;
