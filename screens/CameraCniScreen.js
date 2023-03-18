import { View, TouchableOpacity, StyleSheet, Image, Text } from "react-native";
import React, { useEffect, useState, useRef } from "react";
import { Camera, CameraType, FlashMode } from "expo-camera";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useIsFocused } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { addPhoto } from "../reducers/user";

export default function CameraCniScreen({ navigation }) {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const [hasPermission, setHasPermission] = useState(false);
  const [type, setType] = useState(CameraType.back);
  const [flashMode, setFlashMode] = useState(FlashMode.off);
  const [photoChoice, setphotoChoice] = useState(null);
  let cameraRef = useRef(null);

  //autorisation d'accès à la caméra
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  //prendre la photo et la stocker
  const takePicture = async () => {
    if (cameraRef) {
      const photo = await cameraRef.takePictureAsync({ quality: 0.3 });
      setphotoChoice(photo.uri);
    }
  };

  const savePicture = () => {
    const formData = new FormData();

    formData.append("photoFromFront", {
      //formater les infos de la photo
      uri: photoChoice,
      name: "photo.jpg",
      type: "image/jpeg",
    });

    console.log("formData");
    fetch(`https://backmymedperso.vercel.app/upload`, {
      //instruction pour envoyer vers Cloudinary
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("data", data);
        data.result && dispatch(addPhoto(data.url));
      })
      .catch((error) => console.log(error));
    navigation.navigate("SignUp");
  };

  //reprendre la photo
  const retakePicture = () => {
    setphotoChoice(null);
  };

  //si pas de permission OU pas sur la page, désactiver la caméra.
  if (!hasPermission || !isFocused) {
    return <View></View>;
  }

  //si photoChoice a une valeur, alors afficher la photo avec les boutons reprendre photo ou enregistrer
  if (photoChoice) {
    return (
      <View style={{ flex: 1 }}>
        <Image source={{ uri: photoChoice }} style={{ flex: 1 }} />
        <View style={styles.viewBtn}>
          <TouchableOpacity
            style={styles.button1}
            onPress={() => retakePicture()}
          >
            <Text style={styles.buttonText}>Reprendre la photo</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button1}
            onPress={() => savePicture()}
          >
            <Text style={styles.buttonText}>Enregistrer</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <Camera
      type={type}
      flashMode={flashMode}
      ref={(ref) => (cameraRef = ref)}
      style={styles.camera}
    >
      <View style={styles.buttonsContainer}>
        <TouchableOpacity //bouton pour changer la caméra de sens front/back
          onPress={() =>
            setType(
              type === CameraType.back ? CameraType.front : CameraType.back
            )
          }
          style={styles.button}
        >
          <FontAwesome name="rotate-right" size={25} color="#ffffff" />
        </TouchableOpacity>

        <TouchableOpacity // bouton pour mettre le flash
          onPress={() =>
            setFlashMode(
              flashMode === FlashMode.off ? FlashMode.torch : FlashMode.off
            )
          }
          style={styles.button}
        >
          <FontAwesome
            name="flash"
            size={25}
            color={flashMode === FlashMode.off ? "#ffffff" : "#e8be4b"}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.snapContainer}>
        <TouchableOpacity onPress={() => cameraRef && takePicture()}>
          <FontAwesome name="circle-thin" size={95} color="#5207E6" />
        </TouchableOpacity>
      </View>
    </Camera>
  );
}

const styles = StyleSheet.create({
  camera: {
    flex: 1,
  },
  buttonsContainer: {
    flex: 0.1,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    paddingTop: 20,
    paddingLeft: 20,
    paddingRight: 20,
  },
  button: {
    width: 44,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    borderRadius: 50,
  },
  snapContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
    paddingBottom: 25,
  },
  button1: {
    backgroundColor: "#88FF5B",
    borderColor: "#5207E6",
    borderWidth: 2,
    width: "50%",
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#5207E6",
    fontSize: 16,
  },
  viewBtn: {
    flexDirection: "row",
    justifyContent: "center",
  },
});
