import { View, Text } from "react-native";
import { AppWrapper } from "./AppWrapper";
import { RealmProvider } from "@realm/react";
import Pin from "./Pin";

export default function MyPins({ userInfo }) {
  return (
    <View>
      <Text>Fetch User Pins</Text>
    </View>
  );
}
