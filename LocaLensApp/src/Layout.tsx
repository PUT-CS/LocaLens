import { StatusBar, View } from "react-native";
import { MyText } from "./TextComponents";
import { StyleSheet } from "react-native";
import { styles } from "./styles";

export default function Layout({ children, title }) {
  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" />
      <View style={localStyle.container}>
        <MyText fontSize={40}>{title}</MyText>
      </View>
      {children}
    </View>
  );
}

const localStyle = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    paddingTop: 20,
    //    padding: 30,
    height: "10%",
    width: "100%",
    // backgroundColor: "#202020",
    backgroundColor: "blue",
  },
});
