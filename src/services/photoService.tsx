import axios from "axios";
import { Platform } from "react-native";

const API_URL = "http://192.168.1.52:4000/api";

export const uploadPhoto = async (file: any) => {
  try {
    const formData = new FormData();
    if (Platform.OS === "web") {
      // En web necesitamos crear un File
      const phono = await fetch(file.uri);
      const blob = await phono.blob();

      // Crear un File a partir del blob (necesario para FormData en web)
      const fileNuevo = new File([blob], "photo.jpg", {
        type: blob.type || "image/jpeg",
      });

      formData.append("file", fileNuevo);
    } else {
       console.log("response. movil");
      // En móvil con React Native
      formData.append("file", {
        uri: file.uri,
        name: file.fileName || "photo.jpg",
        type: file.type || "image/jpeg",
      } as any);
    }

    const response = await axios.post(`${API_URL}/upload`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    console.log("response.data", response);
    return response.data;
  } catch (error) {
    console.error("Error en uploadPhoto:", error);
    throw error;
  }
};
