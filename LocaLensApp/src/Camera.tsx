import { Button, Pressable, TouchableOpacity, View } from "react-native";
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
import { IonIcon } from "react-native-vector-icons";

export default function NewPinCamera() {
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
    console.log("TOOK A PICTURE");
  };

  const flipCamera = useCallback(() => {
    setCameraPosition((p) => (p === "back" ? "front" : "back"));
  }, []);

  return (
    <View style={styles.container}>
      <Camera
        ref={camera}
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={isActive}
        photo={true}
      ></Camera>
      <TouchableOpacity
        style={localStyle.button}
        activeOpacity={0.3}
        onPress={takePicture}
      ></TouchableOpacity>
      <TouchableOpacity style={localStyle.button} onPress={flipCamera}>
        {/* <IonIcon name={"camera-reverse"} color={"white"} size={24} /> */}
      </TouchableOpacity>
      {/* <FlipCameraButton onFlipCameraPressed={flipCamera} /> */}
    </View>
  );
}

// export function FlipCameraButton({ onFlipCameraPressed }) {
//   return (
//     <View>
//       <TouchableOpacity style={localStyle.icon} onPress={onFlipCameraPressed}>
//         <IonIcon name={"camera-reverse"} color={"white"} size={24} />
//       </TouchableOpacity>
//     </View>
//   );
// }

const localStyle = StyleSheet.create({
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
