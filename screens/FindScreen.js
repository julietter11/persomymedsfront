import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { searchPosition } from "../reducers/user";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import * as Location from "expo-location";
import { LinearGradient } from 'expo-linear-gradient';

export default function FindScreen({ navigation }) {
  const dispatch = useDispatch();

  const [modalVisible, setModalVisible] = useState(false);
  //const [currentPosition, setCurrentPosition] = useState(null);
  const [adresse, setAdresse] = useState("");
  const [pharmaOrMedoc, setPharmaOrMedoc] = useState("");
  const [selectedButton, setSelectedButton] = useState("");

  const handlePharmacySearch = () => {
    setModalVisible(true);
    setSelectedButton("pharma");
    ("pharma");
    setPharmaOrMedoc("pharma");
  };

  const handleMedicineSearch = () => {
    setModalVisible(true);
    setSelectedButton("medoc");
    setPharmaOrMedoc("medoc");
  };

  const handleClose = () => {
    setModalVisible(false);
  };

  const searchByPosition = () => {
    console.log("test swip ");
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status === "granted") {
        Location.watchPositionAsync({ distanceInterval: 10 }, (location) => {
          //console.log(location);
          //setCurrentPosition(location.coords);
          dispatch(
            searchPosition({
              longitude: location.coords.longitude,
              latitude: location.coords.latitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            })
          );
          if (pharmaOrMedoc === "medoc") {
            navigation.navigate("Resultats Medicaments");
            setModalVisible(false);
          } else if (pharmaOrMedoc === "pharma") {
            navigation.navigate("Map");
            setModalVisible(false);
          }
        });
      }
    })();
  };

  const searchByAdresse = () => {
    fetch(`https://api-adresse.data.gouv.fr/search/?q=${adresse}`)
      .then((response) => response.json())
      .then((data) => {
        const firstCity = data.features[0];
        const newPlace = {
          latitude: firstCity.geometry.coordinates[1],
          longitude: firstCity.geometry.coordinates[0],
        };
        dispatch(searchPosition(newPlace));
      });

    if (pharmaOrMedoc === "medoc") {
      navigation.navigate("Resultats Medicaments");
    } else if (pharmaOrMedoc === "pharma") {
      navigation.navigate("Map");
    }
    setModalVisible(false);
    setAdresse("");
  };

  /*<MapView mapType="hybrid" style={styles.map}>
  {currentPosition && <Marker coordinate={currentPosition} title="My position" pinColor="#fecb2d" />}
  </MapView>*/

  return (

    <LinearGradient
    colors={['hsla(176, 61%, 87%, 1)', 'hsla(150, 54%, 86%, 1)', 'hsla(242, 68%, 84%, 1)']}
    start={{ x: 0, y: 0 }}
    end={{ x: 1, y: 0 }}
    style={styles.gradient}
   >
    <View style={styles.container}>
      <Image style={styles.image} source={require("../assets/pharma3.png")} />

      <View style={styles.container}>
        <View style={styles.searchbutton}>
          <View style={styles.titrecontainer}>
            <Text style={styles.titrepage}> Que souhaitez-vous faire ? </Text>
          </View>

          <TouchableOpacity
            onPress={handlePharmacySearch}
            style={[
              styles.button1,
              selectedButton === "pharma" && styles.selectedButton,
            ]}
          >
            <Icon
              name="hospital-box-outline"
              size={24}
              color="#5207E6"
              style={styles.buttonIcon}
            />
            <Text style={styles.textButtonMod1}>Trouver une pharmacie</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => handleMedicineSearch()}
            style={[
              styles.button2,
              selectedButton === "medoc" && styles.selectedButton,
            ]}
          >
            <Icon
              name="pill"
              size={24}
              color="#5207E6"
              style={styles.buttonIcon}
            />
            <Text style={styles.textButtonMod2}>Trouver un médicament</Text>
          </TouchableOpacity>

          <Modal visible={modalVisible} animationType="fade" transparent>
            <View style={styles.centeredView}>
              <View style={styles.modalContainer}>
                <TouchableOpacity
                  onPress={searchByPosition}
                  style={styles.buttonWithIcon}
                  activeOpacity={0.8}
                >
                  <FontAwesome name="map-marker" size={24} color="#5207E6" />
                  <Text
                    style={[
                      styles.textButtonModal1,
                      { textAlign: "center", textDecorationLine: "underline" },
                    ]}
                  >
                    Autour de Moi
                  </Text>
                </TouchableOpacity>
                <Text style={styles.textOu}>ou</Text>

                <View styles={styles.textInputContainer}>
                  <TextInput
                    style={[
                      styles.textInput,
                      { borderColor: "#88FF5B", borderWidth: 2  },
                    ]}
                    placeholder=" Adresse pour vous géolocaliser"
                    placeholderTextColor="#5207E6"
                    
                    onChangeText={setAdresse}
                    value={adresse}
                  />
                  <TouchableOpacity
                    onPress={searchByAdresse}
                    style={styles.buttonModal}
                    activeOpacity={0.8}
                  >
                    <Text style={styles.textButton}>Rechercher</Text>
                  </TouchableOpacity>
                </View>
                <TouchableOpacity
                  onPress={handleClose}
                  style={styles.button}
                  activeOpacity={0.8}
                >
                  <FontAwesome name="times-circle" size={20} color="#5207E6" />
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View>
      </View>
    </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient : {
    flex: 1,
    
  },
  buttonIcon: {
    height: 30,
    width: 30,
    marginBottom: 10,
    justifyContent: "center",
  },
  map: {
    width: "100%",
    height: "100%",
  },
  titrecontainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 50,
    marginBottom: 20,
  },
  titrepage: {
    fontSize: 30,
    textAlign: "center",
    fontWeight: "light",
    color: "#5207E6",
    textShadowColor: "#88FF5B",
    textShadowOffset: { width: 3, height: 2 },
    textShadowRadius: 2,
    top: -310,
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
  imagedefond: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    alignItems: "center",
  },
  searchbutton: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "100%",
    marginTop: 30,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
    paddingVertical: 10,
    paddingHorizontal: 20,
    bottom: 25,
  },
  selectedButton: {
    backgroundColor: "#88FF5B",
    color: "red",
  },
  button1: {
    flexDirection: "column",
    opacity: 0.9,
    paddingVertical: 15,
    paddingHorizontal: 10,
    alignItems: "center",
    backgroundColor: "white",
    marginBottom: 10,
    width: "48%",
    shadowOffset: { width: 5, height: 3 },
    shadowOpacity: 0.97,
    shadowRadius: 3,
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#88FF5B",
    addingHorizontal: 20,
    position: "absolute",
    top: -200,
    left: 10,
    paddingHorizontal: 8,
  },
  textButtonMod1: {
    color: "#5207E6",
    height: 24,
    fontWeight: "600",
    fontSize: 15,
    textAlign: "center",
    textShadowColor: "#88FF5B",
    textShadowOffset: { width: 3, height: 2 },
    textShadowRadius: 2,
  },
  button2: {
    flexDirection: "column",
    opacity: 0.9,
    alignItems: "center",
    backgroundColor: "white",
    marginBottom: 30,
    width: "48%",
    shadowOffset: { width: 5, height: 3 },
    shadowOpacity: 0.97,
    shadowRadius: 3,
    justifyContent: "center",
    position: "absolute",
    top: -200,
    right: 10,
    paddingVertical: 15,
    paddingHorizontal: 8,
    borderWidth: 2,
    borderColor: "#88FF5B",
  },
  textButtonMod2: {
    color: "#5207E6",
    height: 24,
    fontWeight: "600",
    fontSize: 15,
    textAlign: "center",
    textShadowColor: "#88FF5B",
    textShadowOffset: { width: 3, height: 2 },
    textShadowRadius: 2,
  },
  textButton: {
    fontSize: 20,
    color: "#5207E6",
    textShadowColor: "#88FF5B",
    textShadowOffset: { width: 3, height: 2 },
    textShadowRadius: 3,
    elevation: 10,
    overflow: "hidden",
  },
  modalContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(220,220,255,0.98)",
    padding: 20,
    height: 230,
    width: 250,
  },
  buttonModal: {
    width: 240,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    paddingTop: 8,
    addingHorizontal: 20,
    bottom: 10,
  },
  buttonWithIcon: {
    flexDirection: "row",
    alignItems: "center",
    textAlign: "center",
  },
  textButtonModal1: {
    color: "#5207E6",
    fontSize: 17,
    textAlign: "center",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  textInputContainer: {
    borderWidth: 1,
    borderColor: "red",
    borderRadius: 4,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  textInput: {
    marginTop: 10,
    height: 40,
    fontSize: 16,
    color : "#5207E6"
  },
  textOu: {
    color: "#5207E6",
    fontSize: 20,
  },
});
