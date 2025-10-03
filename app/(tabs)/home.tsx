import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
export default function HomeScreen() {
  return (
      <ScrollView contentContainerStyle={styles.container}>
      {/* <Text style={styles.title}>Menú Principal</Text> */}

      <View style={styles.grid}>
        <TouchableOpacity
          style={styles.card}
          onPress={() => router.push("/ubicacion")}
        >
          <Ionicons name="location-outline" size={40} color="#2b7cff" />
          <Text style={styles.cardText}>Ubicación</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.card}
          onPress={() => router.push("/rostrofacial")}
        >
          <Ionicons name="camera-outline" size={40} color="#ff6b6b" />
          <Text style={styles.cardText}>Rostro Facial</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.card}
          onPress={() => router.push("/marcaciones")}
        >
          <Ionicons name="time-outline" size={40} color="#4caf50" />
          <Text style={styles.cardText}>Marcaciones</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.card}
         
        >
          <Ionicons name="person-outline" size={40} color="#ffa500" />
          <Text style={styles.cardText}>???</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#f9f9f9",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    marginBottom: 20,
    color: "#333",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    width: "100%",
  },
  card: {
    width: "47%", // dos columnas
    aspectRatio: 1, // cuadrado
    backgroundColor: "#fff",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
    elevation: 3, // Android
    shadowColor: "#000", // iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  cardText: {
    fontSize: 16,
    fontWeight: "500",
    marginTop: 10,
    color: "#333",
  },
});
