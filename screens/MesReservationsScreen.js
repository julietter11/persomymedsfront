import { View, Text, Image, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import FontAwesome from "react-native-vector-icons/FontAwesome";

export default function MesReservationsScreen() {
  const user = useSelector((state) => state.user.value);

  const [bookList, setBookList] = useState([]);

  const fetchBook = async () => {
    const response = await fetch(
      `https://backmymedperso.vercel.app/books/${user.token}`
    );
    const data = await response.json();
    //dispatch(likesMed(data));
    //console.log(data.book);
    setBookList([...data.book]);
  };

  useEffect(() => {
    fetchBook();
  }, []);

  const book = bookList.map((data, i) => {
    return (
      <View key={i}>
        <Text style={{ fontSize: 20, color: "#5207E6" }}>
          {data.pharmacyName}
        </Text>
        <Text style={{ fontSize: 16, color: "#5207E6" }}>
          {data.medicamentName}
        </Text>
        <Text style={{ fontSize: 14, color: "red" }}>
          Il vous reste {data.timeRemaining} min pour récupérer votre
          réservation.
        </Text>
      </View>
    );
  });

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={require("../assets/pharma3.png")} />

      <View style={styles.touchablecontainer}>
        <FontAwesome
          name="calendar-check-o"
          size={30}
          marginRight={12}
          color={"#5207E6"}
        />
        <Text style={styles.textButton}>Mes réservations</Text>
      </View>
      <View>{book}</View>
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
    marginBottom: 40,
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
