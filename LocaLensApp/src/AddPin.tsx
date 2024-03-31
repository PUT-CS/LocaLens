import {
  View,
  Image,
  PermissionsAndroid,
  Button,
  ScrollView,
  TextInput,
  ToastAndroid,
} from "react-native";
import { styles } from "./styles";
import { MyText } from "./TextComponents";
import Layout from "./Layout";
import Geolocation from "react-native-geolocation-service";
import { useState } from "react";
import MyButton from "./MyButton";
import AppScreens from "./AppScreens";

// Function to get permission for location
const requestLocationPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: "Geolocation Permission",
        message: "Can we access your location?",
        buttonNeutral: "Ask Me Later",
        buttonNegative: "Cancel",
        buttonPositive: "OK",
      },
    );
    console.log("granted", granted);
    if (granted === "granted") {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    return false;
  }
};

export function AddPin({ route, navigation }) {
  const photo = route.params.photo;

  const [location, setLocation] = useState(false as unknown);
  const getLocation = async () => {
    const result = await requestLocationPermission();
    if (result) {
      Geolocation.getCurrentPosition(
        (position) => {
          setLocation(position);
          const pin = {
            userEmail: "test@gmail.com",
            lat: position.coords.latitude,
            long: position.coords.longitude,
            photo,
            description: text,
          };
          uploadPin(pin);
        },
        (error) => {
          console.error("Location error");
          setLocation(false);
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
      );
    }
  };

  const uploadPin = (pin) => {
    const url = "http://localens.mmilek.pl/pins";
    console.info("uploading", pin);
    const requestOptions = {
      method: "POST",
      headers: {
        "x-api-key": process.env.API_KEY,
      },
      body: JSON.stringify(pin),
    };
    console.log(requestOptions.body);
    fetch(url, requestOptions)
      .then((res) => {
        ToastAndroid.show("Uploaded a pin", ToastAndroid.SHORT);
      })
      .catch((err) => {
        console.error(err);
      });

    navigation.navigate(AppScreens.Map);
  };

  const [text, setText] = useState("");

  return (
    <Layout title={"Add a Pin"}>
      <View style={styles.secondaryContainer}>
        <View
          style={{
            width: "100%",
            height: "50%",
            backgroundColor: "yellow",
            paddingHorizontal: 15,
          }}
        >
          <MyText fontSize={24}>{"Photo"}</MyText>
          <Image
            source={{ uri: photo }}
            style={{
              flex: 1,
              height: undefined,
              width: undefined,
            }}
            resizeMode={"contain"}
          />
        </View>
        <MyText fontSize={24}>{"Description"}</MyText>
        <TextInput
          style={{ height: 150, margin: 20, backgroundColor: "violet" }}
          multiline={true}
          maxLength={140}
          onChangeText={setText}
          value={text}
        />
        <MyButton
          text={"Post"}
          onPress={async () => {
            await getLocation();
          }}
        ></MyButton>
      </View>
    </Layout>
  );
}
