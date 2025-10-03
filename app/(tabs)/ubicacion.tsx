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
      {/* <Text style={styles.title}>📍 Tu Ubicación</Text> */}

      <View style={styles.card}>
        {location ? (
          <>
            <View style={styles.row}>
              <Ionicons name="navigate-outline" size={22} color="#2b7cff" />
              <Text style={styles.label}>Latitud:</Text>
              <Text style={styles.value}>{location.coords.latitude}</Text>
            </View>
            <View style={styles.row}>
              <Ionicons name="compass-outline" size={22} color="#ff6b6b" />
              <Text style={styles.label}>Longitud:</Text>
              <Text style={styles.value}>{location.coords.longitude}</Text>
            </View>
          </>
        ) : (
          <View style={styles.loadingBox}>
            <Ionicons name="location-outline" size={40} color="#aaa" />
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
    backgroundColor: "#f9f9f9",
    padding: 20,
    alignItems: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: "600",
    marginBottom: 20,
    color: "#333",
  },
  card: {
    width: "100%",
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 16,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    marginBottom: 20,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    marginLeft: 8,
    color: "#555",
  },
  value: {
    fontSize: 16,
    marginLeft: 6,
    color: "#111",
  },
  loadingBox: {
    alignItems: "center",
    paddingVertical: 30,
  },
  loadingText: {
    fontSize: 16,
    color: "#777",
    marginTop: 10,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#2b7cff",
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
    elevation: 3,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
});