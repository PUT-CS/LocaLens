import { Button, View } from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { styles } from "./styles";
import AppScreens from "./AppScreens";
import { StyleSheet } from "react-native";
import { style } from "./mapStyle";

export default function MapScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        customMapStyle={style}
      ></MapView>
      <View style={localStyle.button}>
        <Button
          title="Add Pin"
          onPress={async () => {
            navigation.navigate(AppScreens.Camera);
          }}
        />
      </View>
    </View>
  );
}

const localStyle = StyleSheet.create({
  button: {
    position: "absolute",
    width: "30%",
    height: "auto",
    borderRadius: 99,
    bottom: 30,
  },
});
