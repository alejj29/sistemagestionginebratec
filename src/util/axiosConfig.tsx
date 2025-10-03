import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const api = axios.create({
  baseURL: "https://core-demo.ginebratec.com/api", // 👈 cambia por tu API
});

// Interceptor para agregar el token automáticamente
api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
