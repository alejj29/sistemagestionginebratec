import { router } from "expo-router";
import { Button, ScrollView, StyleSheet } from "react-native";
export default function HomeScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Button title="ubicacion " onPress={() => router.push("/ubicacion")} />
      <Button
        title="rostrofacial "
        onPress={() => router.push("/rostrofacial")}
      />
      <Button title="Marcaciones" onPress={() => router.push("/marcaciones")} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 15, // separación entre botones
    paddingVertical: 20,
  },
});
