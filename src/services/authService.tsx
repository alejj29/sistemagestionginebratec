
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../util/axiosConfig";


import { LoginRequest, LoginResponse } from "./../interfaces/AuthInterfaces";

export const loginService = async (
  usuario: string,
  password: string
): Promise<LoginResponse> => {
  try {
    const requestBody: LoginRequest = {
      userName: usuario,
      passwordHash: password,
    };

    const response = await api.post<LoginResponse>("/auth/login", requestBody);
    const data = response.data;

    if (data.token) {
      await AsyncStorage.setItem("token", data.token);
      console.log("Token guardado:", data.token);
    }

    return data;
  } catch (error: any) {
    throw error.response?.data?.message || "Error al iniciar sesión";
  }
};

