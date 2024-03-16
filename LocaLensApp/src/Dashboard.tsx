import { View, Text, Button } from "react-native";
import AppScreens from "./AppScreens";

export default function Dashboard({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Home Screen</Text>
      <Button
        title={AppScreens.Map}
        onPress={() => navigation.navigate(AppScreens.Map)}
      >
        <Text>{AppScreens.Map}</Text>
      </Button>
      <Button
        title={AppScreens.MyPins}
        onPress={() => navigation.navigate(AppScreens.MyPins)}
      >
        <Text>{AppScreens.MyPins}</Text>
      </Button>
    </View>
  );
}
