import { TouchableOpacity, StyleSheet } from "react-native";
import { MyText } from "./TextComponents";

export default function MyButton({ onPress, text }) {
  return (
    <TouchableOpacity onPress={onPress} style={buttonStyle.button}>
      <MyText fontSize={30}>{text}</MyText>
    </TouchableOpacity>
  );
}

const buttonStyle = StyleSheet.create({
  button: {
    backgroundColor: "#dddddd",
    borderRadius: 15,
    padding: 5,
    margin: 4,
    paddingHorizontal: 8
  }
});
