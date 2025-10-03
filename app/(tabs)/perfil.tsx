import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { jwtDecode } from "jwt-decode"; // 👈 importante
import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';


const ProfileScreen = () => {
  const router = useRouter();
  const [user, setUser] = useState<any | null>(null);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const token = await AsyncStorage.getItem("token"); 
        if (token) {
          const decoded = jwtDecode<any>(token);
          setUser(decoded);
        }
      } catch (error) {
        console.error("Error al decodificar token:", error);
      }
    };

    loadUser();
  }, []);

  const handleLogout = async () => {
    await AsyncStorage.removeItem("token");
  //  router.push("/index"); // redirigir al login
  };

  return (
<View style={styles.container}>
  {user ? (
    <>
      {/* Tarjeta de Usuario */}
      <View style={styles.card}>
        <Image
          source={{ uri: user.avatar || "https://i.pravatar.cc/150?img=12" }}
          style={styles.avatar}
        />
        <Text style={styles.name}>{user.fullName}</Text>
        <Text style={styles.email}>{user.email}</Text>
        <Text style={styles.role}>{user.roleName}</Text>
      </View>

      {/* Botón de Cerrar Sesión */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Ionicons name="log-out-outline" size={20} color="#fff" />
        <Text style={styles.logoutButtonText}>Cerrar sesión</Text>
      </TouchableOpacity>
    </>
  ) : (
    <Text>Cargando perfil...</Text>
  )}
</View>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    alignItems: "center",
    padding: 20,
  },
  card: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 25,
    alignItems: "center",
    marginTop: 30,
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    marginBottom: 15,
  },
  name: {
    fontSize: 20,
    fontWeight: "700",
    color: "#333",
  },
  email: {
    fontSize: 14,
    color: "#777",
    marginBottom: 20,
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#3f51b5",
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 30,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    marginTop: 30,
  },
  logoutButtonText: {
    marginLeft: 10,
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  role: {
  fontSize: 14,
  color: "#444",
  marginTop: 5,
  fontWeight: "500",
},
});

export default ProfileScreen;
