import { View, Text, Image, TouchableOpacity } from "react-native";
import AppScreens from "./AppScreens";
import { styles } from "./styles";
import { MyText } from "./TextComponents";

export default function Dashboard({ route, navigation }) {
  const userInfo = route.params.userInfo;

  return (
    <View style={styles.container}>
      <UserHeader userInfo={userInfo} />

      <TouchableOpacity onPress={() => navigation.navigate(AppScreens.Map)}>
        <MyText fontSize={30}>{AppScreens.Map}</MyText>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate(AppScreens.MyPins)}>
        <MyText fontSize={30}>{AppScreens.MyPins}</MyText>
      </TouchableOpacity>
    </View>
  );
}

function UserHeader({ userInfo }) {
  return (
    <View style={{ alignItems: "center", paddingBottom: 32 }}>
      <MyText fontSize={30}>Dashboard</MyText>
      <MyText fontSize={30}>
        {userInfo.user.givenName + " " + userInfo.user.familyName}
      </MyText>
      <Image
        source={{ uri: userInfo.user.photo }}
        style={{ width: 80, height: 80 }}
      ></Image>
    </View>
  );
}
