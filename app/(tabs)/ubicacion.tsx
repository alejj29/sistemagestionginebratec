import { getAddressFromCoords } from "@/src/services/locationService";
import { Ionicons } from "@expo/vector-icons";
import * as Location from "expo-location";
import { useEffect, useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function LocationScreen() {
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );
  const [address, setAddress] = useState<string>("");

  const getLocation = async () => {
    try {
      // 🔒 Solicitar permisos
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permiso denegado",
          "Necesitamos permiso para acceder a tu ubicación"
        );
        return;
      }

      const loc = await Location.getCurrentPositionAsync({});
      console.log("loc", loc);

      const lat = loc.coords.latitude;
      const lon = loc.coords.longitude;


      const result = await getAddressFromCoords(lat, lon);
      console.log("Dirección completa:", result);

      setLocation(loc);
      setAddress(result.display_name || "No se encontró la dirección");
    } catch (error) {
      console.error("Error obteniendo dirección:", error);
      Alert.alert("Error", "No se pudo obtener la ubicación");
    }
  };

  useEffect(() => {
    getLocation();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        {location ? (
          <>

            <View style={styles.coordsRow}>
              <Ionicons name="navigate-outline" size={22} color="#3f51b5" />
              <Text style={styles.label}>Lat:</Text>
              <Text style={styles.value}>
                {location.coords.latitude.toFixed(6)}
              </Text>
              <View style={{ width: 20 }} /> {/* Espacio entre lat y lon */}
              <Ionicons name="compass-outline" size={22} color="#3f51b5" />
              <Text style={styles.label}>Lon:</Text>
              <Text style={styles.value}>
                {location.coords.longitude.toFixed(6)}
              </Text>
            </View>


            <View style={styles.addressBox}>
              <View style={styles.addressHeader}>
                <Ionicons name="location-outline" size={22} color="#3f51b5" />
                <Text style={styles.addressLabel}>Dirección:</Text>
              </View>

              <Text style={styles.addressText}>{address}</Text>
            </View>
          </>
        ) : (
          <View style={styles.loadingBox}>
            <Ionicons name="location-outline" size={40} color="#FF0000" />
            <Text style={styles.loadingText}>Cargando ubicación...</Text>
          </View>
        )}
      </View>

      <TouchableOpacity style={styles.button} onPress={getLocation}>
        <Ionicons name="refresh-outline" size={20} color="#fff" />
        <Text style={styles.buttonText}>Actualizar ubicación</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  addressBox: {
    marginTop: 15,
    borderTopWidth: 1,
    borderColor: "#ddd",
    paddingTop: 12,
    alignItems: "center",
  },

  addressHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },

  addressLabel: {
    marginLeft: 6,
    fontSize: 15,
    fontWeight: "600",
    color: "#333",
    textAlign: "center",
  },

  addressText: {
    fontSize: 14,
    color: "#555",
    lineHeight: 20,
    textAlign: "center",
  },

  coordsRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    flexWrap: "wrap",
    marginBottom: 12,
    gap: 6, // (solo si usas RN 0.71+ o Expo SDK 50+)
  },
  container: {
    flexGrow: 1,
    padding: 20,
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  card: {
    width: "100%",
    padding: 20,
    borderRadius: 16,
    backgroundColor: "#fff",
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    marginBottom: 20,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  label: {
    marginLeft: 8,
    fontSize: 15,
    fontWeight: "600",
    color: "#333",
  },
  value: {
    marginLeft: 6,
    fontSize: 15,
    color: "#555",
  },

  loadingBox: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 20,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 15,
    color: "#777",
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#3f51b5",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 25,
    elevation: 3,
  },
  buttonText: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
  },
});
