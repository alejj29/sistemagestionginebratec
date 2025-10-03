import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Tabs, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import { jwtDecode } from "jwt-decode";

export default function TabLayout() {
 
  const router = useRouter();
  const [user, setUser] = useState<any | null>(null);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const token = await AsyncStorage.getItem("token"); // asumiendo que lo guardaste así
          console.log("token 1",token)
        if (token) {
          const decoded: any = jwtDecode(token); // ✅ decodifica correctamente
          console.log("token decodifcado",decoded)
          setUser(decoded);
        }
      } catch (error) {
        console.log("Error al decodificar token:", error);
      }
    };
    loadUser();
  }, []);

  return (
    <Tabs
      screenOptions={{
        tabBarStyle: { display: "none" },
        headerStyle: { backgroundColor: "#5c6bc0" },
        headerTintColor: "#fff",
        headerTitleStyle: { fontWeight: "600" },
        headerRight: () => (
          <TouchableOpacity
            style={{ flexDirection: "row", alignItems: "center", marginRight: 15 }}
            onPress={() => router.push("/perfil")}
          >
            <Ionicons name="person-circle-outline" size={28} color="#fff" />
            {user && (
              <View style={{ marginLeft: 8 }}>
                <Text style={{ color: "#fff", fontWeight: "600" }}>{user.fullName}</Text>
                <Text style={{ color: "#fff", fontSize: 12 }}>DNI: {user.docNumber}</Text>
              </View>
            )}
          </TouchableOpacity>
        ),
      }}
    >
      <Tabs.Screen name="home" options={{ title: "Inicio", headerShown: true }} />
      <Tabs.Screen name="profile" options={{ title: "Perfil", headerShown: true }} />
      <Tabs.Screen name="rostrofacial" options={{ title: "Cámara", headerShown: true }} />
      <Tabs.Screen name="marcaciones" options={{ title: "Marcaciones", headerShown: true }} />
      <Tabs.Screen name="ubicacion" options={{ title: "Ubicación", headerShown: true }} />
    </Tabs>
  );
}
