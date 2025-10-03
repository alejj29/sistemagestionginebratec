import { uploadPhoto } from '@/src/services/photoService';
import { Ionicons } from '@expo/vector-icons';
import { CameraType, CameraView, useCameraPermissions } from 'expo-camera';
import { useRef, useState } from 'react';
import { Image, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

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
        {/* Cámara */}
        <CameraView style={styles.camera} ref={cameraRef} facing={facing} />

        {/* Botones solo iconos */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={[styles.iconButton, styles.blue]} onPress={toggleCameraFacing}>
            <Ionicons name="camera-reverse-outline" size={28} color="#fff" />
          </TouchableOpacity>

          <TouchableOpacity style={[styles.iconButton, styles.green]} onPress={takePhoto}>
            <Ionicons name="camera-outline" size={28} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Vista previa de la foto */}
        {photoUri && (
          <View style={styles.previewContainer}>
            <Image source={{ uri: photoUri }} style={styles.previewImage} />
            <TouchableOpacity style={[styles.iconButton, styles.red]} onPress={clearPhoto}>
              <Ionicons name="trash-outline" size={24} color="#fff" />
            </TouchableOpacity>
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingVertical: 20,
  },
  camera: {
    flex: 1,
    minHeight: 400,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
    marginBottom: 20,
  },
  iconButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  blue: {
    backgroundColor: '#2196F3',
  },
  green: {
    backgroundColor: '#4CAF50',
  },
  red: {
    backgroundColor: '#F44336',
  },
  previewContainer: {
    alignItems: 'center',
    marginVertical: 10,
    gap: 10,
  },
  previewImage: {
    width: 150,
    height: 200,
    borderRadius: 10,
    resizeMode: 'cover',
  },
});
