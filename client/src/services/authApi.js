import BaseApi from "./api";

const authApi = {
  register: async (userData) => {
    try {
      const response = await BaseApi.post("/auth/register", userData);
      return response.data;
    } catch (error) {
      throw error.response?.data ?? error;
    }
  },
  login: async (userData) => {
    try {
      const response = await BaseApi.post("/auth/login", userData);
      return response.data;
    } catch (error) {
      throw error.response?.data ?? error;
    }
  },
  logout: async () => {
    try {
      const response = await BaseApi.post("/auth/logout");
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },
  getCurrentUser: async (token) => {
    try {
      const response = await BaseApi.get("/auth/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      throw error.response?.data ?? error;
    }
  },
};

export default authApi;