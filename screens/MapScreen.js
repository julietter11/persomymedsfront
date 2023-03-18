import { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { searchPosition } from "../reducers/user";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { getDistance } from "geolib";

export default function MapScreen({ navigation }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);

  const [adresse, setAdresse] = useState("");
  const [markerPharma, setMarkerPharma] = useState([]);

  useEffect(() => {
    fetch(`https://backmymedperso.vercel.app/pharmacies/garde`)
      .then((response) => response.json())
      .then((data) => {
        //console.log(data);
        setMarkerPharma(data.dataPharmacy);
      });
  }, [adresse]);

  /*const markers = user.places.map((data, i) => {
    return <Marker key={i} coordinate={{ latitude: data.latitude, longitude: data.longitude }} title={data.name} />;
  });
  
  {markers}
  */

  const handlePress = () => {
    navigation.navigate("Rechercher");
  };

  const searchByAdresse = () => {
    // https://api-adresse.data.gouv.fr/search/?q=8+bd+du+port
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
    setAdresse("");
  };

  const calculateDistance = (marker1, marker2) => {
    var dis = getDistance(marker1, marker2);
    //alert(`Distance\n\n${dis} Meter\nOR\n${dis / 1000} KM`);
    const kmDis = dis / 1000;
    const roundDis = kmDis.toFixed(2);
    return roundDis;
  };

  const markers = markerPharma.map((data, i) => {
    return (
      <Marker
        key={i}
        coordinate={{
          latitude: data.coordonées.lat,
          longitude: data.coordonées.lon,
        }}
        title={`${data.name}`}
        description={`${calculateDistance(
          {
            latitude: user.position.latitude,
            longitude: user.position.longitude,
          },
          { latitude: data.coordonées.lat, longitude: data.coordonées.lon }
        )} km`}
        pinColor="#5207E6"
      />
    );
  });

  const mapStyle = [
    {
      elementType: "geometry",
      stylers: [
        {
          color: "#f5f5f5",
        },
      ],
    },
    {
      elementType: "labels.icon",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#616161",
        },
      ],
    },
    {
      elementType: "labels.text.stroke",
      stylers: [
        {
          color: "#f5f5f5",
        },
      ],
    },
    {
      featureType: "administrative.land_parcel",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#bdbdbd",
        },
      ],
    },
    {
      featureType: "poi",
      elementType: "geometry",
      stylers: [
        {
          color: "#eeeeee",
        },
      ],
    },
    {
      featureType: "poi",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#757575",
        },
      ],
    },
    {
      featureType: "poi.park",
      elementType: "geometry",
      stylers: [
        {
          color: "#e5e5e5",
        },
      ],
    },
    {
      featureType: "poi.park",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#9e9e9e",
        },
      ],
    },
    {
      featureType: "road",
      elementType: "geometry",
      stylers: [
        {
          color: "#ffffff",
        },
      ],
    },
    {
      featureType: "road.arterial",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#757575",
        },
      ],
    },
    {
      featureType: "road.highway",
      elementType: "geometry",
      stylers: [
        {
          color: "#dadada",
        },
      ],
    },
    {
      featureType: "road.highway",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#616161",
        },
      ],
    },
    {
      featureType: "road.local",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#9e9e9e",
        },
      ],
    },
    {
      featureType: "transit.line",
      elementType: "geometry",
      stylers: [
        {
          color: "#e5e5e5",
        },
      ],
    },
    {
      featureType: "transit.station",
      elementType: "geometry",
      stylers: [
        {
          color: "#eeeeee",
        },
      ],
    },
    {
      featureType: "water",
      elementType: "geometry",
      stylers: [
        {
          color: "#c9c9c9",
        },
      ],
    },
    {
      featureType: "water",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#9e9e9e",
        },
      ],
    },
  ];

  //console.log(user.position);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={user.position}
        provider={PROVIDER_GOOGLE}
        customMapStyle={mapStyle}
      >
        {user.position && (
          <Marker
            coordinate={user.position}
            title="My position"
            pinColor="'#88FF5B"
          />
        )}
        {markers}
      </MapView>
      <View style={styles.searchContainer}>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="nouvelle recherche"
            placeholderTextColor="#5207E6"
            onChangeText={(value) => setAdresse(value)}
            value={adresse}
            style={styles.input}
          />
        </View>
        <TouchableOpacity onPress={() => searchByAdresse()} activeOpacity={0.8}>
          <Text style={styles.textButton}>Valider</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.backButtonContainer}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <FontAwesome name="chevron-left" size={40} color="#88FF5B" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  searchContainer: {
    position: "absolute",
    top: 40,
    right: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  inputContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    padding: 10,
  },
  input: {
    height: 20,
    width: 220,
    color: "black",
    fontSize: 20,
    borderColor: "#88FF5B",
    borderBottomWidth: 1,
    backgroundColor: "transparent",
    marginRight: 10,
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
  backButtonContainer: {
    position: "absolute",
    top: 30,
    left: 20,
    backgroundColor: "rgba(82, 7, 230, 0.5)",
    padding: -5,
  },
  backButton: {
    padding: 10,
  },
});
