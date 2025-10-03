import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
export default function HomeScreen() {
  return (
  <ScrollView contentContainerStyle={styles.container}>
  <View style={styles.grid}>
    <TouchableOpacity
      style={styles.card}
      onPress={() => router.push("/ubicacion")}
    >
      <Ionicons name="location-outline" size={40} color="#3f51b5" />
      <Text style={styles.cardText}>Ubicación</Text>
    </TouchableOpacity>

    <TouchableOpacity
      style={styles.card}
      onPress={() => router.push("/rostrofacial")}
    >
      <Ionicons name="camera-outline" size={40} color="#3f51b5" />
      <Text style={styles.cardText}>Rostro Facial</Text>
    </TouchableOpacity>

    <TouchableOpacity
      style={styles.card}
      onPress={() => router.push("/marcaciones")}
    >
      <Ionicons name="time-outline" size={40} color="#3f51b5" />
      <Text style={styles.cardText}>Marcaciones</Text>
    </TouchableOpacity>

    {/* <TouchableOpacity style={styles.card}>
      <Ionicons name="person-outline" size={40} color="#3f51b5" />
      <Text style={styles.cardText}>Perfil</Text>
    </TouchableOpacity> */}
  </View>
</ScrollView>

  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f5f5f5", // gris suave
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 15,
  },
  card: {
    width: 140,
    height: 140,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff", // blanco suave
    borderWidth: 1,
    borderColor: "#e0e0e0", // gris claro para bordes
    elevation: 3, // sombra Android
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  cardText: {
    marginTop: 10,
    fontSize: 15,
    fontWeight: "600",
    color: "#333", // texto oscuro neutro
  },
});

