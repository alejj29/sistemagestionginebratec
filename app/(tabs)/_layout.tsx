import { Ionicons } from '@expo/vector-icons';
import { Tabs, useRouter } from 'expo-router';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';



export default function TabLayout() {
  const router = useRouter();

  
return (
 <Tabs
  screenOptions={{
    tabBarStyle: { display: 'none' },
    headerStyle: {
      backgroundColor: "#5c6bc0",
    },
    headerTintColor: "#fff",
    headerTitleStyle: {
      fontWeight: "600",
    },
    headerRight: () => {
      const user = {
        nombre: "Alejandro Cáceres",
        dni: "12345678"
      }; // Aquí podés reemplazar con tu estado/contexto real

      return (
        <TouchableOpacity
          style={{ flexDirection: 'row', alignItems: 'center', marginRight: 15 }}
          onPress={() => router.push("/perfil")}
        >
          <Ionicons name="person-circle-outline" size={28} color="#fff" />
          <View style={{ marginLeft: 8 }}>
            <Text style={{ color: "#fff", fontWeight: "600" }}>{user.nombre}</Text>
            <Text style={{ color: "#fff", fontSize: 12 }}>DNI: {user.dni}</Text>
          </View>
        </TouchableOpacity>
      );
    },
  }}
>
  <Tabs.Screen 
    name="home" 
    options={{ title: "Inicio", headerShown: true }} 
  />
  <Tabs.Screen 
    name="profile" 
    options={{ title: "Perfil", headerShown: true }} 
  />
  <Tabs.Screen 
    name="rostrofacial" 
    options={{ title: 'Cámara', headerShown: true }} 
  />
  <Tabs.Screen 
    name="marcaciones" 
    options={{ title: 'Marcaciones', headerShown: true }} 
  />
  <Tabs.Screen 
    name="ubicacion" 
    options={{ title: 'Ubicación', headerShown: true }} 
  />
</Tabs>


  );
}
