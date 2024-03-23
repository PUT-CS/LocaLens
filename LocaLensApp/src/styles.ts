import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: "100%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    verticalAlign: "middle",
    backgroundColor: "#202020",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  header: {
    fontSize: 64,
    color: "white",
    fontFamily: "monospace",
  },
  headerContainer: {
    height: "10%",
    width: "100%",
  },
  buttonText: {
    fontFamily: "monospace",
    fontSize: 32,
    color: "rgba(0,0,0,0)",
  },
});
