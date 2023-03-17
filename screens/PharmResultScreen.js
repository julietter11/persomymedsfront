import { StyleSheet, View, Text } from "react-native";
import React from "react";

export default function PharmResultScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>PharmResultScreen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
