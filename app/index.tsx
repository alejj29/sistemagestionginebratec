import { loginService } from "@/src/services/authService";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert, Button, StyleSheet, Text, TextInput, View } from "react-native";

export default function LoginScreen() {
  const router = useRouter();

  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  
   const handleLogin = async () => {
    if (!usuario || !password) {
      Alert.alert("Error", "Por favor, complete usuario y contraseña");
      return;
    }

    setLoading(true);
    try {
      console.log("usuario",usuario,"password",password)
      const data = await loginService(usuario, password);
      console.log("Respuesta del backend:", data);

      router.replace("/(tabs)/home");
    } catch (error: any) {
      Alert.alert("Error", error.toString());
    } finally {
      setLoading(false);
    }
  };


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <TextInput
        style={styles.input}
        placeholder="Usuario"
        value={usuario}
        onChangeText={setUsuario}
      />

      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <Button title={loading ? "Ingresando..." : "Iniciar Sesión"} onPress={handleLogin} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 30,
  },
  input: {
    width: "100%",
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 20,
    paddingHorizontal: 15,
    fontSize: 16,
  },
});
