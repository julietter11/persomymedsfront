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

  //ouvre le modal (photo/import)
  const handlePress = () => {
    setModalVisible(true);
  };

  //ferme le modal (photo/import)
  const handleClose = () => {
    setModalVisible(false);
  };

  //aller sur la caméra et ferme le modal (photo/import)
  const goToCamera = () => {
    navigation.navigate("CameraCni");
    setModalVisible(false);
  };

  //ferme le modal zoom photo
  const handleClosePhoto = () => {
    setModalPhoto(false);
  };

  //gère le modal zoom photo
  const zoomPhoto = (zoom) => {
    setPhoto(zoom);
    setModalPhoto(true);
  };

  //ajoute un utilisateur en BDD
  const handleValidateSubmit = () => {
    fetch("https://mymeds-backend.vercel.app/users/signup", {
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

  //aller à la gallerie, formate et post photo
  const goToGallery = async () => {
    const formData = new FormData();
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      formData.append("photoFromFront", {
        uri: result.uri,
        name: "photo.jpg",
        type: "image/jpeg",
      });

      fetch(`https://mymeds-backend.vercel.app/upload`, {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data.result);
          data.result && dispatch(addPhoto(data.url));
        });
    } else {
      alert("Vous n'avez pas selectionné d'images.");
    }
  };

  //affiche les photos en miniatures
  const photos = user.photos.map((data, i) => {
    return (
      <View key={i} style={styles.photoContainer}>
        <TouchableOpacity onPress={() => dispatch(removePhoto(data))}>
          <FontAwesome
            name="times"
            size={20}
            color="#000000"
            style={styles.deleteIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => zoomPhoto(data)}>
          <Image source={{ uri: data }} style={styles.photo} />
        </TouchableOpacity>
      </View>
    );
  });

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
            <Pressable onPress={() => handlePress()}>
              <View pointerEvents="none">
                <TextInput
                  style={styles.addPhoto}
                  placeholder="CNI ou Passeport recto"
                  placeholderTextColor="#5207E6"
                  editable={false}
                  onPress={() => handlePress()}
                />
              </View>
            </Pressable>
            <Pressable onPress={() => handlePress()}>
              <View pointerEvents="none">
                <TextInput
                  style={styles.addPhoto}
                  placeholder="CNI ou Passeport verso"
                  placeholderTextColor="#5207E6"
                  editable={false}
                  onPress={() => handlePress()}
                />
              </View>
            </Pressable>
            <View style={styles.photosAdded}>{photos}</View>
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

          <Modal visible={modalVisible} animationType="fade" transparent>
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <FontAwesome
                  style={styles.buttonClose}
                  name="times-circle"
                  size={20}
                  onPress={() => handleClose()}
                />
                <TouchableOpacity
                  onPress={() => goToCamera()}
                  style={styles.modalButton}
                  activeOpacity={0.8}
                >
                  <Text
                    style={{
                      fontSize: 15,
                      color: "#5207E6",
                      textTransform: "uppercase",
                      textShadowColor: "#88FF5B",
                      textShadowOffset: { width: 3, height: 2 },
                      textShadowRadius: 2,
                      elevation: 10,
                    }}
                  >
                    Prendre une photo
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => goToGallery()}
                  style={styles.modalButton}
                  activeOpacity={0.8}
                >
                  <Text
                    style={{
                      fontSize: 15,
                      color: "#5207E6",
                      textTransform: "uppercase",
                      textShadowColor: "#88FF5B",
                      textShadowOffset: { width: 3, height: 2 },
                      textShadowRadius: 2,
                      elevation: 10,
                      marginBottom: 10,
                    }}
                  >
                    Importer depuis galerie
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
          <Modal visible={modalPhoto} animationType="fade">
            <View style={styles.zoomView}>
              <FontAwesome
                style={styles.buttonClose}
                name="times-circle"
                size={20}
                onPress={() => handleClosePhoto()}
              />
              <Image style={styles.imageZoom} source={{ uri: photo }} />
            </View>
          </Modal>
          {isExist === true && <Text style={styles.error}>{error}</Text>}
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
    overflow: "hidden",
  },
  buttonModal: {
    marginTop: 10,
    width: 200,
    marginBottom: 30,
    borderBottomColor: "#88FF5B",
    borderBottomWidth: 3,
    borderRadius: 5,
  },
  textButton: {
    color: "black",
    fontSize: 18,
  },
  buttonClose: {
    color: "#5207E6",
    marginBottom: 20,
    marginTop: 10,
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
