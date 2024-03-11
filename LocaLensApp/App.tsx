import * as React from "react";
import { View, Text, StyleSheet, Button, ScrollView } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MapView, { enableLatestRenderer } from "react-native-maps";
import { style } from "./src/mapStyle";
import { GoogleSigninButton } from "@react-native-google-signin/google-signin";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  GoogleSignin,
  statusCodes,
} from "@react-native-google-signin/google-signin";

enum AppScreens {
  Login = "Login",
  Dashboard = "Dashboard",
  Map = "Map",
  MyPins = "My Pins",
}

GoogleSignin.configure({
  webClientId: process.env.WEB_ID,
  iosClientId: process.env.IOS_ID,
});

WebBrowser.maybeCompleteAuthSession();

function Login({ navigation }) {
  const loginOnPress = async () => {
    try {
      console.log("pressed");
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log(JSON.stringify(userInfo, null, 2));
      setUserInfo(userInfo);
      navigation.replace("Dashboard");
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

  const [userInfo, setUserInfo] = React.useState(null);
  return (
    <ScrollView>
      <Text>Login</Text>
      <GoogleSigninButton
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Dark}
        onPress={loginOnPress}
      />
      <Text>{JSON.stringify(userInfo, null, 2)}</Text>
    </ScrollView>
  );
}

function Dashboard({ navigation }) {
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

function MapScreen() {
  return (
    <View style={styles.container}>
      <MapView style={styles.map} customMapStyle={style} />
    </View>
  );
}

function MyPins() {
  return (
    <View>
      <Text>Fetch User Pins</Text>
    </View>
  );
}

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name={AppScreens.Login} component={Login} />
        <Stack.Screen name={AppScreens.Dashboard} component={Dashboard} />
        <Stack.Screen
          name={AppScreens.Map}
          component={MapScreen}
          options={{ title: AppScreens.Map }}
        />
        <Stack.Screen
          name={AppScreens.MyPins}
          component={MyPins}
          options={{ title: AppScreens.MyPins }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: "100%",
    width: "100%",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default App;
