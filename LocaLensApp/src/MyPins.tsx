import { View, Text } from "react-native";
import Layout from "./Layout";
import { MyText } from "./TextComponents";
import { useEffect, useState } from "react";

export default function MyPins({ userInfo }) {
  const [pins, setPins] = useState(null);
  useEffect(() => {
    fetch("https://localens.mmilek.pl/pins", {
      headers: { "x-api-key": process.env.API_KEY }
    })
      .then(res => res.json())
      .then(data => setPins(data));
  }, []);

  return (
    <Layout title={"My Pins"}>
      <View
        style={{
          alignItems: "center",
          paddingBottom: 32
        }}
      >
        <View>
          <Text>{JSON.stringify(pins)}</Text>
        </View>
      </View>
    </Layout>
  );
}
