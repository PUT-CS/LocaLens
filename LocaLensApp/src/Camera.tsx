import { useState } from "react";
import { View, Text } from "react-native";
import { Camera, CameraType } from "expo-camera";
import { Button, StyleSheet, TouchableOpacity } from "react-native";
import { styles } from "./styles";

export default function NewPinCamera() {
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();

  // if (!permission) ...

  // if (!permission.granted) ...

  function toggleCameraType() {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back,
    );
  }

  return (
    <View style={styles.container}>
      <Camera /* style={styles.camera} */ type={type}>
        <View /* style={styles.buttonContainer} */>
          <TouchableOpacity
            style={localStyle.button}
            onPress={toggleCameraType}
          >
            <Text /* style={styles.text} */>Flip Camera</Text>
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
}

const localStyle = StyleSheet.create({
  button: {
    width: "40%",
    height: "auto",
    borderRadius: 99,
  },
});
