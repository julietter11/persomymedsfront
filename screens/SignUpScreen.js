import {
  KeyboardAvoidingView,
  View,
  Text,
  TextInput,
  Pressable,
  Modal,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Image,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import * as ImagePicker from "expo-image-picker";
import { useDispatch, useSelector } from "react-redux";
import { userLog, addPhoto, removePhoto } from "../reducers/user";

export default function SignUpScreen({ navigation }) {
  const user = useSelector((state) => state.user.value);
  const dispatch = useDispatch();

  const [nom, setNom] = useState("");
  const [prénom, setPrénom] = useState("");
  const [social, setSocial] = useState("");
  const [mail, setMail] = useState("");
  const [mdp, setMdp] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [modalPhoto, setModalPhoto] = useState(false);
  const [photo, setPhoto] = useState("");
  const [isExist, setIsExist] = useState(false);
  const [error, setError] = useState("");

 

  //ajoute un utilisateur en BDD
  const handleValidateSubmit = () => {
    fetch("https://backmymedperso.vercel.app/users/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firstName: prénom,
        lastName: nom,
        email: mail,
        numSecu: social,
        password: mdp,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        //console.log(data);
        if (data.result) {
          //console.log(data.result);
          dispatch(userLog(data.token));
          setNom("");
          setPrénom("");
          setSocial("");
          setMail("");
          setMdp("");
          setIsExist(false);
          if (user.book.idMed) {
            navigation.navigate("Resultats Medicaments");
          } else {
            navigation.navigate("TabNavigator");
          }
        } else {
          //console.log(data)
          setIsExist(true);
          setError(data.error);
        }
      });
  };

  

   
  

  return (
    <KeyboardAvoidingView // pour que le contenu défile au dessus du clavier
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={80} // Fait pour iphone, ajustez la valeur en fonction de votre clavier
    >
      <ScrollView>
        <View style={styles.container}>
          <Image
            style={styles.logo}
            source={require("../assets/pharma3.png")}
          />
          <View style={styles.row}>
            <TextInput
              placeholder="Nom"
              placeholderTextColor="#5207E6"
              onChangeText={(value) => setNom(value)}
              value={nom}
              style={styles.input}
            />
            <TextInput
              placeholder="Prénom"
              placeholderTextColor="#5207E6"
              onChangeText={(value) => setPrénom(value)}
              value={prénom}
              style={styles.input}
            />
            <TextInput
              placeholder="Numéro de Sécurité Sociale"
              placeholderTextColor="#5207E6"
              onChangeText={(value) => setSocial(value)}
              value={social}
              style={styles.input}
            />
          </View>
         
          <View style={styles.row}>
            <TextInput
              placeholder="Email"
              placeholderTextColor="#5207E6"
              onChangeText={(value) => setMail(value)}
              value={mail}
              style={styles.input}
            />
            <TextInput
              placeholder="Mot de passe"
              placeholderTextColor="#5207E6"
              secureTextEntry={true}
              onChangeText={(value) => setMdp(value)}
              value={mdp}
              style={styles.input}
            />
          </View>

          <TouchableOpacity
            onPress={() => handleValidateSubmit()}
            style={styles.button}
            activeOpacity={0.8}
          >
            <Text style={styles.textButton1}>Valider</Text>
          </TouchableOpacity>

          
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  image: {
    width: "100%",
    height: "80%",
  },
  title: {
    width: "80%",
    fontSize: 38,
    fontWeight: "600",
  },
  input: {
    width: 273,
    height: 53,
    marginTop: 22,
    color: "black",
    fontSize: 15,
    borderColor: "#88FF5B",
    borderBottomWidth: 1,
  },
  button: {
    width: 164,
    height: 48,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 50,
    marginTop: 25,
    color: "#5207E6",
    height: 30,
    fontSize: 20,
  },
  modalButton: {
    width: 220,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    paddingTop: 8,
    borderRadius: 10,
  },
  textButton1: {
    fontSize: 20,
    color: "#5207E6",
    textTransform: "uppercase",
    textShadowColor: "#88FF5B",
    textShadowOffset: { width: 3, height: 2 },
    textShadowRadius: 2,
    elevation: 10,
  },
  text: {
    color: "#88FF5B",
    fontSize: 20,
  },
  addPhoto: {
    width: 273,
    height: 53,
    marginTop: 22,
    color: "black",
    fontSize: 15,
    borderColor: "#88FF5B",
    borderBottomWidth: 1,
    justifyContent: "center",
  },

  error: {
    color: "red",
  },
  logoContainer: {
    alignItems: "center",
    width: "50%",
    height: "40%",
    marginTop: 70,
  },
  logo: {
    width: 160,
    height: 100,
    opacity: 0.9,
    marginLeft: 10,
    top: 20,
    marginTop: 70,
  },
  deleteIcon: {
    marginRight: 10,
  },
  photo: {
    margin: 10,
    width: 50,
    height: 50,
  },
  photoContainer: {
    alignItems: "flex-end",
    flexWrap: "wrap",
  },
  galleryContainer: {
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "center",
  },
  photosAdded: {
    flexDirection: "row",
  },
  zoomView: {
    width: "100%",
  },
  imageZoom: {
    width: "100%",
    height: "100%",
  },
});
