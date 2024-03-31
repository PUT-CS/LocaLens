import { View, Text, Image, TouchableOpacity } from "react-native";
import AppScreens from "./AppScreens";
import { styles } from "./styles";
import { MyText } from "./TextComponents";
import Layout from "./Layout";
import MyButton from "./MyButton";

export default function Dashboard({ route, navigation }) {
  const userInfo = route.params.userInfo;

  return (
    <Layout title={AppScreens.Dashboard}>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          height: "80%",
        }}
      >
        <UserHeader userInfo={userInfo} />

        <MyButton
          text={AppScreens.Map}
          onPress={() => navigation.navigate(AppScreens.Map)}
        />

        <MyButton
          text={AppScreens.MyPins}
          onPress={() => navigation.navigate(AppScreens.MyPins)}
        />
      </View>
    </Layout>
  );
}

function UserHeader({ userInfo }) {
  return (
    <View
      style={{
        alignItems: "center",
        paddingBottom: 32,
      }}
    >
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
