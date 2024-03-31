import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    display: "flex",
    ...StyleSheet.absoluteFillObject,
    height: "100%",
    width: "100%",
    backgroundColor: "green",
  },
  secondaryContainer: {
    paddingTop: 20,
    flexGrow: 1,
    alignItems: "center",
    width: "100%",
    backgroundColor: "red",
    // justifyContent: "center",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  header: {
    fontSize: 56,
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
