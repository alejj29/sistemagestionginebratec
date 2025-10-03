import { CheckinPayloadRequest } from "@/src/interfaces/CheckinPayloadInterfaces";
import { checkinService } from "@/src/services/checkinService ";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Alert, Text, View } from "react-native";

export default function LocationScreen() {
  const [loading, setLoading] = useState(false);
  const [marcaciones, setMarcaciones] = useState<any[]>([]);

  const fetchMarcaciones = async () => {
    try {
      setLoading(true);

      console.log("Realizando marcación...");

      const payload: CheckinPayloadRequest = {
        IdCompany: 1,
        UserDeviceId: "15151616",
        CIOTDeviceId: 4,
        DigitalSignature: "NjAtMTc1ODA3MzU5ODc1Mi0tMTIuMDQ2",
        Note: "Marcación desde aplicación web",
        TimezoneOffset: 300,
        LocalDateTime: "2025-09-16T20:46:38.751",
        Latitude: -12.046,
        Longitude: -77.0305,
        GeoAccuracy: 32861,
        GeoAddress:
          "Main Square, Urbanización Cercado de Lima, Lima 15001, Peru",
        GeoCountry: "Peru",
        GeoCity: "Lima",
        GeoDevice:
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36 Edg/140.0.0.0", // si estás en web, para apps nativas usar expo-device
        GeoIP: "179.6.7.19",
      };

      console.log("Payload enviado:", payload);

      const data = await checkinService(payload);

      console.log("Respuesta del servicio:", data);
      setMarcaciones(data);
    } catch (error: any) {
      console.log("Error al llamar al servicio:", error);
      Alert.alert("Error", "No se pudo realizar la marcación");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMarcaciones();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <Text>Marcaciones realizadas: {marcaciones.length}</Text>
      )}
    </View>
  );
}
