import { GoogleSigninButton } from "@react-native-google-signin/google-signin";
import { View, Text } from "react-native";
import {
  GoogleSignin,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as WebBrowser from "expo-web-browser";
import { StyleSheet } from "react-native";
import { styles } from "./styles";

GoogleSignin.configure({
  webClientId: process.env.WEB_ID,
  iosClientId: process.env.IOS_ID,
});

WebBrowser.maybeCompleteAuthSession();

export default function Login({ navigation }) {
  const loginOnPress = async () => {
    try {
      console.log("pressed");
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      // console.log(JSON.stringify(userInfo, null, 2));
      // setUserInfo(userInfo);
      await AsyncStorage.setItem("@user", JSON.stringify(userInfo));
      navigation.replace("Dashboard", { userInfo: userInfo });
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log("sign in cancelled");
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log("sign in in progress");
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log("play services not available");
        // play services not available or outdated
      } else {
        console.log("other error");
        // some other error happened
      }
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Welcome</Text>
      <GoogleSigninButton
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Dark}
        onPress={loginOnPress}
      />
    </View>
  );
}
const localStyle = StyleSheet.create({
  // container: {
  //   verticalAlign: "middle",
  //   width: "100%",
  //   height: "100%",
  //   alignItems: "center",
  // },
});
