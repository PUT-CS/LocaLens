import { View } from "react-native";
import MapView from "react-native-maps";
import { style } from "./mapStyle";
import { styles } from "./styles";

export default function MapScreen() {
  return (
    <View style={styles.container}>
      <MapView style={styles.map} customMapStyle={style} />
    </View>
  );
}
