import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
  ScrollView,
  Button,
  FlatList,
} from "react-native";
import { getDistance } from "geolib";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useSelector, useDispatch } from "react-redux";
import { bookMed, validateBook } from "../reducers/user";
import { Modal } from "react-native";
import CustomLinearGradient from "../components/CustomLinearGradient"

export default function MedResultScreen({ navigation }) {
  const BACKEND_URL = "https://backmymedperso.vercel.app";

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);

  const [suggestions, setSuggestions] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [listMedoc, setListMedoc] = useState([]);
  const [nbResult, setNbResult] = useState(3);
  const [isVisible, setIsVisible] = useState(true);
  const [isVisibleScroll, setIsVisibleScroll] = useState(false);
  const [likedMed, setLikedMed] = useState([]);
  const [change, SetChange] = useState(false);
  const [modalBookLogin, setModalBookLogin] = useState(false);
  const [modalBookNolog, setModalBookNolog] = useState(false);

  const fetchMedoc = async () => {
    const response = await fetch ("https://backmymedperso.vercel.app/medicaments/allMedicaments");
    const data = await response.json();

    const list = data.medicaments;
    setSuggestions([...list]);
  };

  const fetchLike = async () => {
    const response = await fetch(`${BACKEND_URL}/users/${user.token}/likeMed`);
    const data = await response.json();
    //console.log(data);
    setLikedMed(data.like);
  };

  useEffect(() => {
    fetchMedoc();
  }, []);

  useEffect(() => {
    fetchLike();
  }, [change]);

  useEffect(() => {
    if (user.book.idMed) {
      setModalBookLogin(true);
    } else {
      setModalBookLogin(false);
      setModalBookNolog(false);
    }
  }, []);

  const calculateDistance = (marker1, marker2) => {
    var dis = getDistance(marker1, marker2);
    const kmDis = dis / 1000;
    const roundDis = kmDis.toFixed(2);
    return roundDis;
  };

  const handleSubmit = async () => {
    const medStock = await fetch(`${BACKEND_URL}/stocks/${searchText}`);
    const data = await medStock.json();

    if (data) {
      const list = data.stocks.map((data) => {
        return {
          name: data.pharmacy.name,
          adress: data.pharmacy.adress,
          distance: calculateDistance(
            {
              latitude: user.position.latitude,
              longitude: user.position.longitude,
            },
            {
              latitude: data.pharmacy.coordonées.lat,
              longitude: data.pharmacy.coordonées.lon,
            }
          ),
          quantity: data.quantity,
          idPharma: data.pharmacy._id,
          idMed: data.medicament,
        };
      });
      setListMedoc([...list]);
      setIsVisibleScroll(true);
      setIsVisible(false);
    }
  };

  const resultSort = listMedoc
    .sort((a, b) => a.distance - b.distance)
    .slice(0, nbResult)
    .map((data, i) => {
      return (
        <View key={i}>
          <View style={styles.encadre}>
            <Text style={styles.label}>{data.name}</Text>
            <View style={styles.info}>
              <FontAwesome
                name="medkit"
                size={30}
                marginRight={12}
                color={"#5207E6"}
              />
              <Text style={styles.value}>Quantité: {data.quantity}</Text>
              <Text style={styles.value}>{data.adress}</Text>
              <Text style={styles.value}>{data.distance} km</Text>
              <Button
                title="Reserver"
                onPress={() => handleBook(data.idPharma, data.idMed)}
                color="#5207E6"
              />
            </View>
          </View>
        </View>
      );
    });

  const handleNext = () => {
    setNbResult(nbResult + 3);
  };

  const filterMeds = () => {
    if (searchText.length > 2) {
      return suggestions.filter((med) =>
        med.Nom.toLowerCase().includes(searchText.toLowerCase())
      );
    }
  };

  const renderMeds = ({ item }) => (
    <TouchableOpacity
      onPress={() => handlePress(item.Nom)}
      style={styles.button}
    >
      <Text style={{ fontSize: 18, color: "#5207E6" }}>{item.Nom}</Text>
    </TouchableOpacity>
  );

  const handlePress = (data) => {
    setSearchText(data);
  };

  const handleSearch = (data) => {
    setSearchText(data);
  };

  const handleLikeMed = () => {
    if (user.token) {
      fetch(`${BACKEND_URL}/medicaments/likeMed/${searchText}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: user.token }),
      })
        .then((response) => response.json())
        .then((data) => {
          //console.log(data);
          if (data.result) {
            SetChange(!change);
          }
        });
    }
  };

  const handleBook = (idPharma, idMed) => {
    dispatch(bookMed({ idMed: idMed, idPharma: idPharma }));
    if (user.token) {
      setModalBookLogin(true);
    } else {
      setModalBookNolog(true);
    }
  };

  const handleConnect = () => {
    navigation.navigate("Connect");
  };

  const handleValidate = () => {
    fetch(`${BACKEND_URL}/books/${user.book.idMed}/${user.book.idPharma}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token: user.token }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.message);
        if (data.result) {
          setModalBookLogin(false);
          dispatch(validateBook());
          navigation.navigate("Mes Reservations");
        }
      });
  };

  const handleClose = () => {
    setModalBookLogin(false);
    setModalBookNolog(false);
  };

  let likeStyle;
  if (likedMed.some((e) => e === searchText)) {
    likeStyle = "#f91980";
  }

  return (

    <CustomLinearGradient
    >
    <View style={styles.global}>
      {isVisible && (
        <View style={styles.screen}>
          <TextInput
            style={styles.input}
            placeholder="Rechercher un médicament"
            placeholderTextColor="#5207E6"
            onChangeText={(value) => handleSearch(value)}
            value={searchText}
            color="#5207E6"
          />
          <FlatList
            data={filterMeds([])}
            renderItem={renderMeds}
            keyExtractor={(item) => item._id}
          />
          <TouchableOpacity
            onPress={() => handleSubmit()}
            style={styles.button}
          >
            <Text style={styles.textButton}>Trouver</Text>
          </TouchableOpacity>
        </View>
      )}

      {isVisibleScroll && (
        <View style={styles.resultSearch}>
          <View>
            <Text
              style={{ fontSize: 20, color: "#5207E6", fontWeight: "bold" }}
            >
              {searchText}
            </Text>
            <TouchableOpacity onPress={() => handleLikeMed()}>
              <FontAwesome
                name="heart"
                size={20}
                marginRight={8}
                color={likeStyle}
              />
            </TouchableOpacity>
          </View>
          <ScrollView contentContainerStyle={{ paddingRight: 40 }}>
            <View style={styles.encadre}>{resultSort}</View>
          </ScrollView>
        </View>
       
      )}

      {listMedoc.length > nbResult && (
        <View style={styles.footer}>
          <Button
            style={styles.button}
            title="Plus de pharmacies"
            onPress={() => handleNext()}
            color="#5207E6"
          />
        </View>
      )}

      {modalBookLogin && (
        <Modal animationType="fade" transparent={true} visible={modalBookLogin}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={[styles.modaltext, { marginBottom: 30 }]}>
                Si vous validez votre réservation sera effective pendant 2h
              </Text>
              <TouchableOpacity
                onPress={() => handleValidate()}
                activeOpacity={0.8}
              >
                <Text style={[styles.modalButtonText, { marginBottom: 30 }]}>
                  Valider
                </Text>
              </TouchableOpacity>
              <FontAwesome
                style={styles.buttonClose}
                name="times-circle"
                size={20}
                color={"#5207E6"}
                onPress={() => handleClose()}
              />
            </View>
          </View>
        </Modal>
      )}
      {modalBookNolog && (
        <Modal animationType="fade" transparent={true} visible={modalBookNolog}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={[styles.modaltext, { marginBottom: 20 }]}>
                Vous devez être connecté pour réserver vos médicaments
              </Text>
              <TouchableOpacity
                onPress={() => handleConnect()}
                activeOpacity={0.8}
              >
                <Text style={[styles.modalButtonText1, { marginBottom: 30 }]}>
                  Se connecter / S'inscrire
                </Text>
              </TouchableOpacity>
              <FontAwesome
                style={styles.buttonClose}
                name="times-circle"
                size={20}
                color={"#5207E6"}
                onPress={() => handleClose()}
              />
            </View>
          </View>
        </Modal>
      )}
    </View>
    </CustomLinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  global: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  screen: {
    flex: 1,
    position: "absolute",
    alignItems: "center",
    top: 60,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: "#88FF5B",
    marginBottom: 30,
    fontSize: 27,
    top: 30,
  },
  textButton: {
    fontSize: 20,
    color: "#88FF5B",
    textTransform: "uppercase",
    textShadowColor: "#5207E6",
    textShadowOffset: { width: 1, height: 2 },
    textShadowRadius: 2,
    elevation: 10,
    overflow: "hidden",
  },
  encadre: {
    flex: 1,
  },
  label: {
    fontWeight: "bold",
    marginBottom: 5,
    fontSize: 20,
    color: "#5207E6",
  },
  value: {
    fontSize: 18,
    marginBottom: 10,
    color: "#5207E6",
  },
  info: {
    borderWidth: 2,
    padding: 20,
    borderColor: "#88FF5B",
    marginBottom: 60,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
  },
  footer: {
    alignItems: "center",
    borderTopColor: "#ccc",
    paddingBottom: 80,
  },
  button: {
    paddingHorizontal: 10,
  },
  resultSearch: {
    paddingTop: 140,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.3)",
  },
  modalContent: {
    width: "60%",
    height: "30%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(220, 220, 255, 0.98)",
    borderRadius: 0,
    padding: 20,
  },
  modalButtonText: {
    fontSize: 15,
    color: "#5207E6",
    textTransform: "uppercase",
    textShadowColor: "#88FF5B",
    textShadowOffset: { width: 3, height: 2 },
    textShadowRadius: 3,
    elevation: 10,
    overflow: "hidden",
  },
  modalButtonText1: {
    fontSize: 13,
    color: "#5207E6",
    textTransform: "uppercase",
    textShadowColor: "#88FF5B",
    textShadowOffset: { width: 3, height: 2 },
    textShadowRadius: 3,
    elevation: 10,
    overflow: "hidden",
  },
  modaltext: {
    fontSize: 12,
    color: "red",
  },
});
