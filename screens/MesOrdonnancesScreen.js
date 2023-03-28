import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Modal,
} from "react-native";
import React, { useState, useEffect } from "react";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import * as ImagePicker from "expo-image-picker";
import { useDispatch, useSelector } from "react-redux";
import { removePhoto, addPhoto, addPhotoFromBdd } from "../reducers/user";
import CustomLinearGradient from "../components/CustomLinearGradient"

export default function MesOrdonnancesScreen({ navigation }) {
  const user = useSelector((state) => state.user.value);
  const dispatch = useDispatch();

  const [modalPhoto, setModalPhoto] = useState(false);
  const [photo, setPhoto] = useState("");
  //const [ordoList, setOrdoList] = useState([]);

  const fetchOrdo = async () => { 
    const response = await fetch(
      `https://backmymedperso.vercel.app/photos/upload/${user.token}`
    );
    const data = await response.json();

    data.result && dispatch(addPhotoFromBdd(data.ordonnances));
    // setOrdoList([...data.ordonnances]);
  };

  useEffect(() => {
    fetchOrdo();
  }, []);

  //aller sur la caméra
  const GoToCamera = () => {
    navigation.navigate("Camera");
  };

  //ferme le modal zoom photo
  const handleClosePhoto = () => {
    setModalPhoto(false);
  };

  //delete photo
  const handleDelete = (url) => {
    fetch(`https://backmymedperso.vercel.app/photos/deletePhoto/${user.token}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url: url }),
    })
      .then((response) => response.json())
      .then((data) => console.log(data.message));
    dispatch(removePhoto(url));
  };

  //gère le modal zoom photo
  const zoomPhoto = (zoom) => {
    setPhoto(zoom);
    setModalPhoto(true);
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

      fetch(`https://backmymedperso.vercel.app/photos/upload/${user.token}`, {
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
        <TouchableOpacity onPress={() => handleDelete(data)}>
          <FontAwesome
            name="times"
            size={20}
            color="#5207E6"
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

    <CustomLinearGradient
    >
    <View style={styles.container}>
      <Image style={styles.image} source={require("../assets/pharma3.png")} />

      <View style={styles.touchablecontainer}>
        <FontAwesome
          name="file-text-o"
          size={30}
          marginRight={12}
          color={"#5207E6"}
        />
        <Text style={styles.textButton}>Mes ordonnances</Text>
      </View>
      <View style={styles.bothContainer}>
        <TouchableOpacity onPress={() => GoToCamera()} activeOpacity={0.8}>
          <Text style={styles.buttons}>Prendre une photo</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.bothContainer}>
        <TouchableOpacity onPress={() => goToGallery()} activeOpacity={0.8}>
          <Text style={styles.buttons}>Importer depuis galerie</Text>
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.galleryContainer}>
        <View style={styles.viewGallery}>
          <ScrollView>{photos}</ScrollView>
        </View>
      </ScrollView>
      <Modal visible={modalPhoto} animationType="fade">
        <View style={styles.zoomView}>
          <FontAwesome
            style={styles.buttonClose}
            name="times-circle"
            size={30}
            color="#5207E6"
           
            onPress={() => handleClosePhoto()}
          />
          <Image style={styles.imageZoom} source={{ uri: photo }} />
        </View>
      </Modal>
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
  galleryContainer: {
  flex : 1,
  width : "50%",
    borderWidth: 3,
    borderColor: "#88FF5B",
    marginTop: 10,
  },
  viewGallery: {
  
    flexDirection: "row",
  flexWrap: "wrap",
  justifyContent: "flex-start",
    
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
  buttons: {
    fontSize: 20,
    color: "#5207E6",
    textTransform: "uppercase",
   
  },
  textButton: {
    fontSize: 30,
    color: "#5207E6",
  },
  bothContainer: {
    flex: 1,
    width: "100%",
    maxHeight: 80,
    minHeight: 80,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    borderWidth: 3,
    borderColor: "#88FF5B",
  },
  photo: {
    margin: 10,
    width: 150,
    height: 150,
  },
  deleteIcon: {
    marginRight: 10,
  },
  photoContainer: {
    alignItems: "flex-end",
  },
  zoomView: {
    width: "100%",
  },
  imageZoom: {
    width: "100%",
    height: "100%",
  },
  buttonClose: {
    color: "#5207E6",
    marginBottom: 20,
    marginTop: 10,
  },
});
