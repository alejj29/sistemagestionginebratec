import { Ionicons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import { useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function LocationScreen() {
  const [location, setLocation] = useState<Location.LocationObject | null>(null);

  const getLocation = async () => {
    try {
      // Solicitar permisos
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permiso denegado', 'Necesitamos permiso para acceder a tu ubicación');
        return;
      }

      // Obtener ubicación
      const loc = await Location.getCurrentPositionAsync({});
      setLocation(loc);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getLocation();
  }, []);

  return (
    <View style={styles.container}>
  <View style={styles.card}>
    {location ? (
      <>
        <View style={styles.row}>
          <Ionicons name="navigate-outline" size={22} color="#3f51b5" />
          <Text style={styles.label}>Latitud:</Text>
          <Text style={styles.value}>{location.coords.latitude}</Text>
        </View>
        <View style={styles.row}>
          <Ionicons name="compass-outline" size={22} color="#3f51b5" />
          <Text style={styles.label}>Longitud:</Text>
          <Text style={styles.value}>{location.coords.longitude}</Text>
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
</View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    backgroundColor: "#3f51b5", // 👉 color principal
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
