import { TouchableOpacity, View } from "react-native";
import { StyleSheet } from "react-native";
import { styles } from "./styles";
import {
  Camera,
  useCameraPermission,
  useCameraDevice,
} from "react-native-vision-camera";
import { useIsFocused } from "@react-navigation/native";
import { useAppState } from "@react-native-community/hooks";
import { useCallback, useRef, useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import { CameraRoll } from "@react-native-camera-roll/camera-roll";
import AppScreens from "./AppScreens";

export default function NewPinCamera({ navigation }) {
  const { hasPermission, requestPermission } = useCameraPermission();
  if (!hasPermission) {
    requestPermission();
  }
  const [cameraPosition, setCameraPosition] = useState<"front" | "back">(
    "back",
  );
  let device = useCameraDevice(cameraPosition);

  const isFocused = useIsFocused();
  const appState = useAppState();
  const isActive = isFocused && appState === "active";
  const camera = useRef<Camera>(null);

  const takePicture = async () => {
    const photo = await camera.current.takePhoto();
    const res = await CameraRoll.saveAsset(`file://${photo.path}`, {
      type: "photo",
      album: "LocaLens",
    });

    navigation.navigate(AppScreens.AddPin, {
      photoUri: res.node.image.uri,
      photoObj: photo,
      location: "location",
    });
    console.log(res);
    console.log("TOOK A PICTURE");
  };

  const flipCamera = useCallback(() => {
    setCameraPosition((p) => (p === "back" ? "front" : "back"));
  }, []);

  return (
    <View style={{ ...styles.container }}>
      <Camera
        ref={camera}
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={isActive}
        photo={true}
      ></Camera>
      <ShutterButton onPress={takePicture} />
      <View style={localStyle.cameraIconContainer}>
        <CameraFlipIcon onPress={flipCamera} />
      </View>
    </View>
  );
}

function CameraFlipIcon({ onPress }) {
  return (
    <Ionicons
      style={localStyle.cameraIcon}
      name="camera-reverse"
      size={40}
      color="white"
      onPress={onPress}
    />
  );
}

function ShutterButton({ onPress }) {
  return (
    <View style={{ position: "absolute", bottom: 0 }}>
      <TouchableOpacity
        style={localStyle.button}
        activeOpacity={0.3}
        onPress={onPress}
      >
        <Ionicons
          name="camera-sharp"
          size={64}
          color={"black"}
          style={{ paddingLeft: 12 }}
        />
      </TouchableOpacity>
    </View>
  );
}

const localStyle = StyleSheet.create({
  cameraIconContainer: {
    padding: 20,
    position: "absolute",
    display: "flex",
    top: 10,
    right: 0,
    flexDirection: "column",
  },
  cameraIcon: {
    flex: 1,
  },
  camera: {
    width: "100%",
    height: "100%",
  },
  button: {
    width: 100,
    height: 100,
    bottom: 30,
    borderRadius: 999,
    backgroundColor: "white",
    borderColor: "black",
    borderWidth: 5,
    borderStyle: "solid",
    justifyContent: "center",
    verticalAlign: "middle",
  },
  icon: {
    width: 50,
    height: 50,
    backgroundColor: "black",
    // bottom: 30,
    // borderRadius: 999,
    // backgroundColor: "white",
  },
});
