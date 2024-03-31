import { TouchableOpacity } from "react-native";
import { MyText } from "./TextComponents";

export default function MyButton({ onPress, text }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <MyText fontSize={30}>{text}</MyText>
    </TouchableOpacity>
  );
}
