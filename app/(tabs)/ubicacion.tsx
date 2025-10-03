import * as Location from 'expo-location';
import { useEffect, useState } from 'react';
import { Alert, Button, StyleSheet, Text, View } from 'react-native';

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
      <Text style={styles.title}>📍 Tu Ubicación</Text>
      {location ? (
        <>
          <Text>Latitud: {location.coords.latitude}</Text>
          <Text>Longitud: {location.coords.longitude}</Text>
        </>
      ) : (
        <Text>Cargando ubicación...</Text>
      )}
      <Button title="Actualizar ubicación" onPress={getLocation} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { fontSize: 22, marginBottom: 20 },
});
