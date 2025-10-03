import { Tabs } from 'expo-router';
import React from 'react';



export default function TabLayout() {
return (
  <Tabs
  screenOptions={{
    tabBarStyle: { display: 'none' }, // oculta el footer/tabBar
  }}
>
  {/* Pantalla de inicio */}
  <Tabs.Screen 
    name="home" 
    options={{ title: "Inicio", headerShown: true }} // sin header en inicio
  />

  {/* Otras pantallas */}
  <Tabs.Screen 
    name="profile" 
    options={{ title: "Perfil", headerShown: true }} // header con botón de volver
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
  options={{
    title: 'Ubicación',
    headerShown: true,
  }} 
/>
</Tabs>
  );
}
