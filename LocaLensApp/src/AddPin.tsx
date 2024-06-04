import {
  View,
  Image,
  PermissionsAndroid,
  Button,
  ScrollView,
  TextInput,
  ToastAndroid
} from "react-native";
import { styles } from "./styles";
import { MyText } from "./TextComponents";
import Layout from "./Layout";
import Geolocation from "react-native-geolocation-service";
import { useState } from "react";
import MyButton from "./MyButton";
import AppScreens from "./AppScreens";
import { PhotoFile } from "react-native-vision-camera";

// Function to get permission for location
export const requestLocationPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: "Geolocation Permission",
        message: "Can we access your location?",
        buttonNeutral: "Ask Me Later",
        buttonNegative: "Cancel",
        buttonPositive: "OK"
      }
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
  const photoUri = route.params.photoUri;
  // const photo = route.params.photoObj as PhotoFile;
  // const photoRes = await fetch(`file://${photo.path}`);
  // const photoData = await photoRes.blob();
  // console.info(photoData);

  const onGetLocation = position => {
    let body = {
      userEmail: "test@gmail.com",
      lat: position.coords.latitude,
      long: position.coords.longitude,
      description: text
    };
    uploadPin(body);
  };

  const getLocation = async () => {
    if (!await requestLocationPermission()) return;

    Geolocation.getCurrentPosition(
      onGetLocation,
      error => {
        console.error("Location error: ", error);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  };

  const uploadPin = async body => {
    console.info("uploading", body);
    console.info("API_KEY", process.env.API_KEY);
    fetch("https://localens.mmilek.pl/pins", {
      method: "GET",
      headers: {
        "x-api-key": process.env.API_KEY,
        "Content-Type": "application/json",
        Accept: "application/json"
      }
      //body,
    })
      .then(res => {
        res.json().then(data => {
          // for (let pin of data) {
          //   console.info(pin);
          // }
          ToastAndroid.show("Uploaded a pin", ToastAndroid.SHORT);
        });
      })
      .catch(err => {
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
            paddingHorizontal: 15
          }}
        >
          <Image
            source={{ uri: photoUri }}
            style={{
              flex: 1,
              height: undefined,
              width: undefined,
              borderColor: "black",
              borderWidth: 10,
              borderRadius: 15
            }}
            resizeMode={"contain"}
          />
        </View>
        <MyText fontSize={24}>{"Description"}</MyText>
        <TextInput
          style={{
            minHeight: 50,
            width: "80%",
            margin: 20,
            backgroundColor: "#eeeeee",
            borderRadius: 30,
            padding: 20
          }}
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
        />
      </View>
    </Layout>
  );
}
