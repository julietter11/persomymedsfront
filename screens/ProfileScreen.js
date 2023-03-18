import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useSelector } from "react-redux";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { LinearGradient } from 'expo-linear-gradient';

export default function ProfileScreen({ navigation }) {
  const user = useSelector((state) => state.user.value);
  //console.log(user);

  const [userInfo, setUserInfo] = useState({});

  const fetchUser = async () => {
    const response = await fetch(
      `https://backmymedperso.vercel.app/users/${user.token}`
    );
    const data = await response.json();

    const info = { firstName: data.firstName, lastName: data.lastName };

    setUserInfo(info);
    //setSuggestions([...suggestions, ...data.medicaments.name]);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const handleMedicamentsSubmit = () => {
    navigation.navigate("Mes Medicaments");
  };

  const handleOrdonnancesSubmit = () => {
    navigation.navigate("Mes Ordonnances");
  };
  const handlePharmaciesSubmit = () => {
    navigation.navigate("Mes Pharmacies");
  };
  const handleReservationsSubmit = () => {
    navigation.navigate("Mes Reservations");
  };

  const handleParameterSubmit = () => {
    navigation.navigate("Parametre");
  };

  return (

    <LinearGradient
    colors={['hsla(176, 61%, 87%, 1)', 'hsla(150, 54%, 86%, 1)', 'hsla(242, 68%, 84%, 1)']}
    start={{ x: 0, y: 0 }}
    end={{ x: 1, y: 0 }}
    style={styles.gradient}
   >
    <View style={styles.topContainer}>
      <Image style={styles.logo} source={require("../assets/pharma3.png")} />

      <FontAwesome
        name="user-circle"
        size={50}
        color="#5207E6"
        marginRight={12}
      />
      <View>
        <Text style={styles.user}>
          {userInfo.lastName} / {userInfo.firstName}
        </Text>
      </View>

      <View style={styles.bottomContainer}>
        <TouchableOpacity
          style={styles.touchablecontainer}
          onPress={() => handleMedicamentsSubmit()}
          activeOpacity={0.8}
        >
          <Icon name="pill" size={50} marginRight={12} color={"#5207E6"} />
          <Text style={styles.textButton}>Mes médicaments</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.touchablecontainer}
          onPress={() => handleOrdonnancesSubmit()}
          activeOpacity={0.8}
        >
          <FontAwesome
            name="file-text-o"
            size={50}
            marginRight={12}
            color={"#5207E6"}
          />
          <Text style={styles.textButton}>Mes ordonnances</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.touchablecontainer}
          onPress={() => handleReservationsSubmit()}
          activeOpacity={0.8}
        >
          <FontAwesome
            name="calendar-check-o"
            size={50}
            marginRight={12}
            color={"#5207E6"}
          />
          <Text style={styles.textButton}>Mes réservations</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.touchablecontainer}
          onPress={() => handleParameterSubmit()}
          activeOpacity={0.8}
        >
          <FontAwesome
            name="user"
            size={50}
            marginRight={12}
            color={"#5207E6"}
          />
          <Text style={styles.textButton}> Mes paramètres</Text>
        </TouchableOpacity>
      </View>
    </View>

    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: { 
    flex: 1 
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
  },
  topContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    resizeMode: "contain",
  },
  image: {
    width: "50%",
    height: "20%",
  },
  bottomContainer: {
    width: "100%",
    resizeMode: "contain",
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
  textButton: {
    fontSize: 20,
    color: "#5207E6"
  },
  logo: {
    width: 250,
    height: 100,
    opacity: 0.9,
    marginLeft: 10,
    resizeMode: "contain",
    marginBottom: 40,
  },
  user: {
    fontSize: 20,
    color: "#5207E6",
    marginBottom: 30,
  },
});
