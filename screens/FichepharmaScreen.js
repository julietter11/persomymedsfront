import React, { useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
} from "react-native";
import { Feather } from "@expo/vector-icons";

const SearchBar = ({ searchText, setSearchText }) => {
  return (
    <View style={styles.searchmedoc}>
      <Feather name="search" style={styles.icon} />
      <TextInput
        style={styles.input}
        placeholder="Rechercher une pharmacie"
        placeholderTextColor="#aaa"
        value={searchText}
        onChangeText={(text) => setSearchText(text)}
      />
    </View>
  );
};

export default function FichepharmaScreen({ navigation }) {
  const [searchText, setSearchText] = useState("");
  const handleSubmit = () => {};

  return (
    <>
      <View style={styles.screen}>
        <SearchBar searchText={searchText} setSearchText={setSearchText} />
        <TouchableOpacity onPress={handleSubmit} style={styles.button}>
          <Text style={styles.textButton}>Trouver</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.encadre}>
        <Text style={styles.label}>pharma du marche</Text>
        <Text style={styles.value}>120 rue de la Convention</Text>
        <Text style={styles.label}>paris</Text>
        <Text style={styles.value}>Num</Text>
        <Text style={styles.value}>Ouvrir dans plan</Text>
        <Text style={styles.value}>Horaire</Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  searchmedoc: {
    flexDirection: "row",
    backgroundColor: "#f2f2f2",
    borderRadius: 5,
    alignItems: "center",
    paddingHorizontal: 10,
    marginHorizontal: 30,
    marginVertical: 20,
    borderWidth: 3,
    borderColor: "#88FF5B",
    fontSize: 18,
    backgroundColor: "white",
  },
  icon: {
    fontSize: 20,
    color: "#88FF5B",
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 40,
    fontSize: 16,
    color: "#333",
  },
  textButton: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#5207E6",
  },
  encadre: {
    borderWidth: 2,
    padding: 20,
    borderColor: "#5207E6",
    marginBottom: 30,
    paddingHorizontal: 10,
    marginHorizontal: 20,
    marginVertical: 30,
  },
  label: {
    fontWeight: "bold",
    marginBottom: 5,
  },
  value: {
    fontSize: 18,
    marginBottom: 10,
  },
});
