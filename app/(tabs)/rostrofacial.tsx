import { uploadPhoto } from '@/src/services/photoService';
import { Ionicons } from '@expo/vector-icons';
import { CameraType, CameraView, useCameraPermissions } from 'expo-camera';
import { useRef, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function App() {
  const [facing, setFacing] = useState<CameraType>('back');
  const [permission, requestPermission] = useCameraPermissions();
  const [photoUri, setPhotoUri] = useState<string | null>(null);
  const [photoBase64, setPhotoBase64] = useState<string | null>(null);

  const cameraRef = useRef<any>(null);

  if (!permission) {
    return <View />; // permisos cargando
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={[styles.iconButton, styles.blue]} onPress={requestPermission}>
          <Ionicons name="camera-outline" size={28} color="#fff" />
        </TouchableOpacity>
      </View>
    );
  }

  const toggleCameraFacing = () => {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  };

const takePhoto = async () => {
  if (cameraRef.current) {
    try {
      const photo = await cameraRef.current.takePictureAsync({ base64: false });
      console.log("photo1",photo)
      setPhotoUri(photo.uri);
      setPhotoBase64(photo.base64 || null);

      // 👉 Subir la foto al backend
      const result = await uploadPhoto(photo);
      console.log("Foto subida, respuesta del backend:", result);
    } catch (error) {
      console.log("Error al tomar o subir foto:", error);
    }
  }
};


  const clearPhoto = () => {
    setPhotoUri(null);
    setPhotoBase64(null);
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={styles.container}>
        {/* <Text style={styles.title}>📷 Captura de Rostro</Text> */}

        {/* Cámara */}
        <View style={styles.cameraWrapper}>
          <CameraView style={styles.camera} ref={cameraRef} facing={facing} />
        </View>

        {/* Botones de acción */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={[styles.iconButton, styles.blue]} onPress={toggleCameraFacing}>
            <Ionicons name="camera-reverse-outline" size={30} color="#fff" />
          </TouchableOpacity>

          <TouchableOpacity style={[styles.iconButton, styles.green]} onPress={takePhoto}>
            <Ionicons name="camera-outline" size={30} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Vista previa de la foto */}
        {photoUri && (
          <View style={styles.previewCard}>
            <Text style={styles.previewTitle}>Vista Previa</Text>
            <Image source={{ uri: photoUri }} style={styles.previewImage} />
            <TouchableOpacity style={[styles.iconButton, styles.red]} onPress={clearPhoto}>
              <Ionicons name="trash-outline" size={22} color="#fff" />
            </TouchableOpacity>
          </View>
        )}
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
    fontSize: 22,
    fontWeight: "600",
    marginBottom: 15,
    color: "#333",
  },
  cameraWrapper: {
    width: "100%",
    height: 300,
    borderRadius: 16,
    overflow: "hidden",
    marginBottom: 20,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
  },
  iconButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginHorizontal: 15,
    justifyContent: "center",
    alignItems: "center",
    elevation: 4, // Android sombra
    shadowColor: "#000", // iOS sombra
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  blue: { backgroundColor: "#2b7cff" },
  green: { backgroundColor: "#4caf50" },
  red: { backgroundColor: "#ff6b6b" },
  previewCard: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 15,
    alignItems: "center",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  previewTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
    color: "#333",
  },
  previewImage: {
    width: "100%",
    height: 200,
    borderRadius: 12,
    marginBottom: 10,
  },
});
