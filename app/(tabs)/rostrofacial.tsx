import { uploadPhoto } from '@/src/services/photoService';
import { Ionicons } from '@expo/vector-icons';
import { CameraType, CameraView, useCameraPermissions } from 'expo-camera';
import { useRef, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Toast from 'react-native-toast-message';
export default function App() {
  const [facing, setFacing] = useState<CameraType>('back');
  const [permission, requestPermission] = useCameraPermissions();
  const [photoUri, setPhotoUri] = useState<string | null>(null);
  const [photoBase64, setPhotoBase64] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

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

  const showToast = () => {
    Toast.show({
      type: 'success', // 'success', 'error', 'info'
      text1: 'Confirmación',
      text2: 'La acción se ha realizado correctamente ✅',
      position: 'bottom', // 'top' o 'bottom'
      visibilityTime: 3000, // duración en ms
      autoHide: true,
    });
  };
  const toggleCameraFacing = () => {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  };

  const takePhoto = async () => {
    if (cameraRef.current) {
      try {
        const photo = await cameraRef.current.takePictureAsync({ base64: false });
        setPhotoUri(photo.uri);
        setPhotoBase64(photo.base64 || null);
      } catch (error) {
        console.log("Error al tomar la foto:", error);
      }
    }
  };

  const uploadToS3 = async () => {
    if (!photoUri) return;
    setUploading(true);
    try {
      const result = await uploadPhoto({ uri: photoUri });
      
      clearPhoto();
    } catch (error) {

    } finally {
      setUploading(false);
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
            <Ionicons name="camera-reverse-outline" size={28} color="#fff" />
          </TouchableOpacity>

          <TouchableOpacity style={[styles.iconButton, styles.green]} onPress={takePhoto}>
            <Ionicons name="camera-outline" size={28} color="#fff" />
          </TouchableOpacity>

          {photoUri && (
            <TouchableOpacity
              style={[styles.iconButton, styles.purple]}
              onPress={uploadToS3}
              disabled={uploading}
            >
              <Ionicons name={uploading ? "cloud-upload-outline" : "cloud-upload"} size={28} color="#fff" />
            </TouchableOpacity>
          )}
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
    backgroundColor: "#f2f2f7",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 20,
    color: "#1c1c1e",
  },
  cameraWrapper: {
    width: "100%",
    height: 320,
    borderRadius: 20,
    overflow: "hidden",
    marginBottom: 20,
    backgroundColor: "#000",
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
    width: 65,
    height: 65,
    borderRadius: 35,
    marginHorizontal: 10,
    justifyContent: "center",
    alignItems: "center",
    elevation: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  blue: { backgroundColor: "#3f51b5" },
  green: { backgroundColor: "#008000" },
  red: { backgroundColor: "#FF0000" },
  purple: { backgroundColor: "#8b5cf6" },
  previewCard: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 15,
    alignItems: "center",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    marginTop: 10,
  },
  previewTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
    color: "#1c1c1e",
  },
  previewImage: {
    width: "100%",
    height: 220,
    borderRadius: 15,
    marginBottom: 10,
  },
});
