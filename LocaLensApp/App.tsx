import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MyPins from "./src/MyPins";
import MapScreen from "./src/MapScreen";
import Dashboard from "./src/Dashboard";
import Login from "./src/Login";
import AppScreens from "./src/AppScreens";
import Camera from "./src/Camera";
import { AddPin } from "./src/AddPin";
import { useFonts } from "expo-font";
import { Colors } from "react-native/Libraries/NewAppScreen";

const Stack = createNativeStackNavigator();

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "white"
  }
};

function App() {
  const [fontsLoaded] = useFonts({
    qcsr: require("./assets/fonts/qcsr.ttf")
  });
  return (
    <NavigationContainer theme={MyTheme}>
      <Stack.Navigator>
        <Stack.Screen
          name={AppScreens.Login}
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={AppScreens.Dashboard}
          component={Dashboard}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={AppScreens.Map}
          component={MapScreen}
          options={{ title: AppScreens.Map, headerShown: false }}
        />
        <Stack.Screen
          name={AppScreens.MyPins}
          component={MyPins}
          options={{ title: AppScreens.MyPins, headerShown: false }}
        />
        <Stack.Screen
          name={AppScreens.Camera}
          component={Camera}
          options={{ title: AppScreens.Camera, headerShown: false }}
        />
        <Stack.Screen
          name={AppScreens.AddPin}
          component={AddPin}
          options={{ title: AppScreens.AddPin, headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
