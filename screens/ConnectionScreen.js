import React, { useRef, useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Modal,
  TextInput,
  KeyboardAvoidingView,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useIsFocused } from "@react-navigation/native";
import { userLog } from "../reducers/user";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import CustomLinearGradient from "../components/CustomLinearGradient"

export default function ConnectionScreen({ navigation }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);
  const isFocused = useIsFocused();

  const video = useRef(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [isExist, setIsExist] = useState(false);
  const [error, setError] = useState("");

  if (user.token && isFocused) {
    navigation.navigate("TabNavigator");
  }

  useEffect(() => {
    (async () => {
      if (video.current != null) {
        await video.current.playAsync();
      }
    })();
  }, []);

  const handleValidateac = () => {
    setModalVisible(true);
  };

  const handlego = async () => {
    fetch("https://backmymedperso.vercel.app/users/signin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email,
        password: Password,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        //console.log(data);
        if (data.result) {
          dispatch(userLog(data.token));
          setEmail("");
          setPassword("");
          setIsExist(false);
          setModalVisible(false);
          if (user.book.idMed) {
            navigation.navigate("Resultats Medicaments");
          } else {
            navigation.navigate("TabNavigator");
          }
        } else {
          setIsExist(true);
          setError(data.error);
        }
      });
  };

  const handleinsc = () => {
    navigation.navigate("SignUp");
  };

  const handleNoConnect = () => {
    navigation.navigate("Rechercher");
  };

  const handleClose = () => {
    setModalVisible(false);
  };

  return (


      <CustomLinearGradient
   >
      <View style={styles.logoContainer}>
        <Image style={styles.logo} source={require("../assets/pharma3.png")} />
      </View>

      <View style={styles.buttonContainer3}>
        <View style={styles.inscrire}>
          <TouchableOpacity onPress={() => handleinsc()} activeOpacity={0.8}>
            <Text style={[styles.textBu, { fontSize: 20 }]}>S'inscrire</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.connect}>
          <TouchableOpacity
            onPress={() => handleValidateac()}
            activeOpacity={0.8}
          >
            <Text style={[styles.textBu, { fontSize: 20 }]}>Se connecter</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.buttonContainer1}>
        <TouchableOpacity onPress={() => handleNoConnect()} activeOpacity={0.8}>
          <Text style={styles.textBu1}>Continuer sans se connecter</Text>
        </TouchableOpacity>
      </View>

      <Modal
        animationType="fade"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer} >
          <View style={styles.modalContent}>
            <FontAwesome
              style={styles.buttonClose}
              name="times-circle"
              size={20}
              onPress={() => handleClose()}
            />
            <TextInput
              style={styles.input}
              placeholder="Adresse email"
              onChangeText={(text) => setEmail(text)}
              value={email}
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              secureTextEntry={true}
              onChangeText={(text) => setPassword(text)}
              value={Password}
            />
            <TouchableOpacity onPress={() => handlego()} activeOpacity={0.8}>
              <Text style={styles.modalButtonText}>Se connecter</Text>
            </TouchableOpacity>
          </View>
          {isExist === true && <Text style={styles.error}>{error}</Text>}
        </View>
      </Modal>
      </CustomLinearGradient>

  );
}

const styles = StyleSheet.create({
  

 
  swipeContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  video: {
    flex: 1,
    width: "100%",
    height: "100%",
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  contentContainer: {
    flex: 1,
    width: "100%",
    height: "100%",
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
  },
  logoContainer: {
    alignItems: "center",
    width: "100%",
    height: "40%",
  },
  buttonContainer1: {
    alignItems: "center",
    justifyContent: "center",
    bottom: -70,
  },
  inscrire: {
    borderBottomWidth: 1,
    borderBottomColor: "#88FF5B",
    marginBottom: 30,
  },
  connect: {
    borderBottomWidth: 1,
    borderBottomColor: "#88FF5B",
  },
  buttonContainer3: {
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    height: 200,
    width: 300,
    justifyContent: "center",
    alignItems: "center",
    left: "13%",
    borderWidth: 1,
    borderColor: "#88FF5B",
  },
  logo: {
    width: "80%",
    height: "65%",
    opacity: 0.9,
    marginLeft: 10,
    resizeMode: "contain",
  },
  titleContainer: {
    position: "absolute",
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    padding: 10,
    top: 10,
  },
  title: {
    fontSize: 48,
    color: "#5207E6",
    opacity: 0.9,
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
    top : -30
  
  },
  modalButton: {
    width: 220,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    paddingTop: 8,
    backgroundColor: "#5207E6",
    borderRadius: 10,
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
  input: {
    width: 200,
    marginBottom: 30,
    borderBottomColor: "#88FF5B",
    borderBottomWidth: 3,
    borderRadius: 5,
  },
  textButton: {
    fontSize: 20,
    color: "#5207E6",
  },
  buttonClose: {
    color: "#5207E6",
    marginBottom: 25,
  },
  textBu: {
    fontSize: 10,
    color: "#5207E6",
    textTransform: "uppercase",
  },
  textBu1: {
    fontSize: 15,
    color: "#5207E6",
    textTransform: "uppercase",
    elevation: 10,
    overflow: "hidden",
  },
  error: {
    color: "red",
  },
});
