import { Stack } from 'expo-router';
import 'react-native-reanimated';


export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {


  return (
     <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />      {/* Login */}
      <Stack.Screen name="(tabs)" />     {/* Tabs */}
    </Stack>
  );
}
