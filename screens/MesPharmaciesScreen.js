import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import CustomLinearGradient from "../components/CustomLinearGradient"

export default function MesMedicamentsScreen() {
  return (
    <CustomLinearGradient
    >
      <View style={styles.container}>
        <Image style={styles.image} source={require("../assets/pharma3.png")} />

        <View style={styles.touchablecontainer}>
          <FontAwesome
            name="asterisk"
            size={30}
            marginRight={12}
            color={"#5207E6"}
          />
          <Text style={styles.textButton}>Mes pharmacies</Text>
        </View>
      </View>
    </CustomLinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: "center",
    padding: 10,
  },
  touchablecontainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    padding: 10,
    marginBottom: 10,
    borderColor: "#88FF5B",
    borderWidth: 3,
    borderRadius: 5,
  },
  image: {
    width: 250,
    height: 100,
    opacity: 0.9,
    marginLeft: 10,
    resizeMode: "contain",
    marginBottom: 40,
  },
  title: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: 73,
    backgroundColor: "#5207E6",
  },
  textButton: {
    fontSize: 30,
    color: "#5207E6",
  },
});
