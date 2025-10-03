import { Tabs } from 'expo-router';
import React from 'react';



export default function TabLayout() {
return (
 <Tabs
  screenOptions={{
    tabBarStyle: { display: 'none' }, // oculta el footer/tabBar
    headerStyle: {
      backgroundColor: "#5c6bc0", // 👉 azul menos intenso
    },
    headerTintColor: "#fff", // texto e íconos en blanco
    headerTitleStyle: {
      fontWeight: "600",
    },
  }}
>
  {/* Pantalla de inicio */}
  <Tabs.Screen 
    name="home" 
    options={{ title: "Inicio", headerShown: true }} 
  />

  {/* Otras pantallas */}
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
