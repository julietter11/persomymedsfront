import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TextInput,
} from "react-native";
import React, { useEffect, useState } from "react";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, logout } from "../reducers/user";

export default function ParametreScreen({ navigation }) {
  const user = useSelector((state) => state.user.value);
  const dispatch = useDispatch();

  const [userInfo, setUserInfo] = useState({});
  const [modalMail, setModalMail] = useState(false);
  const [modalPassword, setModalPassword] = useState(false);
  const [modalAccount, setModalAccount] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [change, setChange] = useState(false);

  const fetchUser = async () => {
    const response = await fetch(
      `https://backmymedperso.vercel.app/users/${user.token}`
    );
    const data = await response.json();

    const info = { email: data.email };

    setUserInfo(info);
    //setSuggestions([...suggestions, ...data.medicaments.name]);
  };

  useEffect(() => {
    fetchUser();
    console.log(userInfo);
  }, [change]);

  const updateEmail = () => {
    setModalMail(true);
  };

  const updatePassword = () => {
    setModalPassword(true);
  };

  const deleteAccount = () => {
    setModalAccount(true);
  };

  const emailUpdataValidate = () => {
    fetch(`https://mymeds-backend.vercel.app/users/${user.token}/updateEmail`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ currentPassword: password, newEmail: email }),
    })
      .then((response) => response.json())
      .then((data) => {
        //console.log(data);
        if (data.result) {
          dispatch(deleteUser(data));
          setEmail("");
          setPassword("");
          setModalMail(false);
          setChange(!change);
        }
      });
  };

  const passwordUpdataValidate = () => {
    fetch(
      `https://mymeds-backend.vercel.app/users/${user.token}/updatePassword`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currentPassword: password,
          newPassword: newPassword,
        }),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.result) {
          setNewPassword("");
          setPassword("");
          setModalPassword(false);
        }
      });
  };

  const deleteAccountValidate = () => {
    fetch(`https://mymeds-backend.vercel.app/users/delete/${user.token}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token: user.token }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.result) {
          setPassword("");
          setModalAccount(false);
          navigation.navigate("Connect");
        }
      });
  };

  const handleClose = () => {
    setModalMail(false);
    setModalPassword(false);
    setModalAccount(false);
  };

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={require("../assets/pharma3.png")} />

      <View style={styles.touchablecontainer}>
        <FontAwesome name="user" size={30} marginRight={12} color={"#5207E6"} />
        <Text style={styles.textButton}>Mes paramètres</Text>
      </View>
      <View>
        <Text style={styles.textconfig1}> Votre email: {userInfo.email}</Text>
        <TouchableOpacity
          style={styles.TouchableOpacity}
          onPress={() => updateEmail()}
        >
          <Text style={styles.textconfig}>Changer d'adresse email</Text>
        </TouchableOpacity>
      </View>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalMail}
        onRequestClose={() => setModalMail(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <FontAwesome
              style={styles.buttonClose}
              name="times-circle"
              color="#5207E6"
              size={25}
              onPress={() => handleClose()}
            />
            <TextInput
              style={styles.input}
              placeholder="Adresse email"
              placeholderTextColor="#5207E6"
              onChangeText={(text) => setEmail(text)}
              value={email}
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor="#5207E6"
              secureTextEntry={true}
              onChangeText={(text) => setPassword(text)}
              value={password}
            />
            <TouchableOpacity
              onPress={() => emailUpdataValidate()}
              activeOpacity={0.8}
            >
              <Text style={styles.modalButtonText}>Valider</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <View>
        <TouchableOpacity
          style={styles.TouchableOpacity}
          onPress={() => updatePassword()}
        >
          <Text style={styles.textconfig}>Changer de mot de passe</Text>
        </TouchableOpacity>
      </View>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalPassword}
        onRequestClose={() => setModalPassword(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <FontAwesome
              style={styles.buttonClose}
              name="times-circle"
              size={25}
              color="#5207E6"
              onPress={() => handleClose()}
            />
            <TextInput
              style={styles.input}
              placeholder="Nouveau mot de passe"
              placeholderTextColor="#5207E6"
              onChangeText={(text) => setNewPassword(text)}
              value={newPassword}
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor="#5207E6"
              secureTextEntry={true}
              onChangeText={(text) => setPassword(text)}
              value={password}
            />
            <TouchableOpacity
              onPress={() => passwordUpdataValidate()}
              activeOpacity={0.8}
            >
              <Text style={styles.modalButtonText}>Valider</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <TouchableOpacity
        style={styles.TouchableOpacity}
        onPress={() => deleteAccount()}
      >
        <Text style={styles.textconfig}>Supprimer mon compte</Text>
      </TouchableOpacity>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalAccount}
        onRequestClose={() => setModalAccount(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <FontAwesome
              style={styles.buttonClose}
              name="times-circle"
              size={25}
              color="#5207E6"
              onPress={() => handleClose()}
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor="#5207E6"
              secureTextEntry={true}
              onChangeText={(text) => setPassword(text)}
              value={password}
            />
            <TouchableOpacity
              onPress={() => deleteAccountValidate()}
              activeOpacity={0.8}
            >
              <Text style={styles.modalButtonText}>Valider</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <TouchableOpacity
        style={styles.TouchableOpacity}
        onPress={() => {
          navigation.navigate("Connect");
          dispatch(logout());
        }}
      >
        <Text style={styles.textconfig}>Se déconnecter</Text>
      </TouchableOpacity>
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
  textconfig: {
    width: 273,
    height: 53,
    marginTop: 22,
    color: "#5207E6",
    fontSize: 20,
  },
  textconfig1: {
    width: 273,
    height: 53,
    marginTop: 22,
    color: "grey",
    fontSize: 20,
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
    textAlign: "center",
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
    borderRadius: 5,
    marginTop: 50,
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
    color: "#88FF5B",
    textTransform: "uppercase",
    textShadowColor: "#5207E6",
    textShadowOffset: { width: 3, height: 2 },
    textShadowRadius: 3,
    elevation: 10,
    overflow: "hidden",
  },
  TouchableOpacity: {
    width: 273,
    height: 53,
    marginTop: 22,
    borderColor: "#88FF5B",
    borderBottomWidth: 1,
  },
  buttonClose: {
    color: "#5207E6",
    marginBottom: 30,
  },
  input: {
    width: 200,
    marginBottom: 30,
    borderBottomColor: "#88FF5B",
    borderBottomWidth: 3,
    borderRadius: 5,
  },
});
