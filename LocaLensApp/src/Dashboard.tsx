import { View, Text, Image, TouchableOpacity } from "react-native";
import AppScreens from "./AppScreens";
import { styles } from "./styles";
import { MyText } from "./TextComponents";
import Layout from "./Layout";
import MyButton from "./MyButton";
import Geolocation from "react-native-geolocation-service";
import { requestLocationPermission } from "./AddPin";
import { useEffect, useState } from "react";

export default function Dashboard({ route, navigation }) {
  const userInfo = route.params.userInfo;
  const [temperature, setTemperature] = useState(null);

  const onGetLocation = position => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m`;
    fetch(url)
      .then(response => response.json())
      .then(data => {
        console.log("Temperature: ", data.current.temperature_2m);
        setTemperature(data.current.temperature_2m);
      })
      .catch(error => {
        console.error("Weather error: ", error);
      });
    console.log("Location: ", position);
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

  useEffect(() => {
    getLocation();
  }, []);

  return (
    <Layout title={AppScreens.Dashboard}>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          height: "80%"
        }}
      >
        <UserHeader userInfo={userInfo} />
        <MyText fontSize={20}>
          {temperature
            ? `Temperature: ${temperature}°C`
            : "Loading temperature..."}
        </MyText>

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
        paddingBottom: 32
      }}
    >
      <MyText fontSize={30}>
        {userInfo.user.givenName + " " + userInfo.user.familyName}
      </MyText>
      <Image
        source={{ uri: userInfo.user.photo }}
        style={{ width: 180, height: 180, borderRadius: 20, margin: 10 }}
      />
    </View>
  );
}
