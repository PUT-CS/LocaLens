import { View, Image } from "react-native";
import { styles } from "./styles";
import { MyText } from "./TextComponents";

export function AddPin({ route, navigation }) {
  const [photo, location] = [route.params.photo, route.params.location];
  console.log(photo, location);
  return (
    <View style={styles.container}>
      <MyText>{"Add a Pin!"}</MyText>
      {/* <MyText>{photo}</MyText> */}
      <Image
        source={{ uri: photo }}
        style={{ width: "50%", height: "50%" }}
      ></Image>
      <MyText>{location}</MyText>
    </View>
  );
}
