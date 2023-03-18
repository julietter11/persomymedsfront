import { View, Text, Image, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export default function MesMedicamentsScreen() {
  const user = useSelector((state) => state.user.value);

  const [likedMed, setLikedMed] = useState([]);

  const fetchLike = async () => {
    const response = await fetch(
      `https://backmymedperso.vercel.app/users/${user.token}/likeMed`
    );
    const data = await response.json();
    // console.log(data);
    setLikedMed(data.like);
  };

  useEffect(() => {
    fetchLike();
  }, []);

  const medocList = likedMed.map((data, i) => {
    return (
      <View key={i} style={{ marginBottom: 10 }}>
        <Text style={{ fontSize: 20, color: "#5207E6" }}>{data}</Text>
      </View>
    );
  });

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={require("../assets/pharma3.png")} />

      <View style={styles.touchablecontainer}>
        <Icon name="pill" size={30} marginRight={12} color={"#5207E6"} />
        <Text style={styles.textButton}>Mes médicaments</Text>
      </View>
      <View>{medocList}</View>
    </View>
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
    marginBottom: 70,
    marginTop: 70,
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
