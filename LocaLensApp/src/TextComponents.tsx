import { Text, View } from "react-native";
import { styles } from "./styles";

export function MyText({ fontSize = 40, children }) {
  return <Text style={{ ...styles.header, fontSize }}>{children}</Text>;
}

export function Header({ children }) {
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.header}>{children}</Text>
    </View>
  );
}
