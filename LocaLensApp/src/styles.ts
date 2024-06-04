import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    display: "flex",
    ...StyleSheet.absoluteFillObject,
    height: "100%",
    width: "100%",
  },
  secondaryContainer: {
    paddingTop: 20,
    flexGrow: 1,
    alignItems: "center",
    width: "100%",
    // justifyContent: "center",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  header: {
    fontSize: 56,
    fontFamily: "qcsr",
  },
  headerContainer: {
    height: "10%",
    width: "100%",
  },
  buttonText: {
    fontFamily: "qcsr",
    fontSize: 32,
    color: "rgba(0,0,0,0)",
  },
});
