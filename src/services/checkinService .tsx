import AsyncStorage from "@react-native-async-storage/async-storage";
import { CheckinPayloadRequest } from "../interfaces/CheckinPayloadInterfaces";
import api from "../util/axiosConfig";

export const checkinService = async (payload: CheckinPayloadRequest) => {
  try {
    // Recuperar token
    const token = await AsyncStorage.getItem("token");

    if (!token) {
      throw new Error("No se encontró el token. Debes iniciar sesión primero.");
    }

    const response = await api.post(
      "/Checkinout/InsertCheckInOutWeb",
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      }
    );

    return response.data;
  } catch (error: any) {
    throw error.response?.data?.message || "Error al registrar asistencia";
  }
};
