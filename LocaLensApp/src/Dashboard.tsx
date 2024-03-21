import { View, Text, Button, Image } from "react-native";
import AppScreens from "./AppScreens";

export default function Dashboard({ route, navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <UserHeader userInfo={route.params.userInfo} />
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

function UserHeader({ userInfo }) {
  console.log(JSON.stringify(userInfo, null, 2));
  console.log(userInfo.user.photo);
  return (
    <View>
      <Text>User Info</Text>
      <Text>{userInfo.user.givenName + " " + userInfo.user.familyName}</Text>
      <Image
        source={{ uri: userInfo.user.photo }}
        style={{ width: 80, height: 80 }}
      ></Image>
    </View>
  );
}
