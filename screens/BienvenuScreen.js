import React, { useRef, useEffect } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  ScrollView,
  SafeAreaView,
  Dimensions,
} from "react-native";
import { Video } from "expo-av";
import { LinearGradient } from 'expo-linear-gradient';

export default function BienvenuScreen({ navigation }) {
  const video1 = useRef(null);

  useEffect(() => {
    (async () => {
      if (video1.current !== null) {
        await video1.current.playAsync();
      }
    })();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.onboardingScrollView}
        horizontal={true}
        pagingEnabled={true}
        showsHorizontalScrollIndicator={true}
      >
        <View style={styles.onboardingView}>
          <Video
            ref={video1}
            source={require("../assets/pills.mp4")}
            style={styles.video}
            resizeMode="cover"
            isLooping
          />
          <View style={styles.logoContainer2}>
            <Image
              style={styles.logo2}
              source={require("../assets/pharma4.png")}
            />
          </View>
          <View style={styles.title1Container}>
            <Text style={styles.title1}>Bienvenue !</Text>
          </View>
        </View>
        <LinearGradient

colors={['hsla(176, 61%, 87%, 1)', 'hsla(150, 54%, 86%, 1)', 'hsla(242, 68%, 84%, 1)']}
start={{ x: 0, y: 0 }}
end={{ x: 1, y: 0 }}
style={styles.gradient}
>
        <View style={styles.onboardingView}>
          <View style={styles.logoContainer}>
            <Image
              style={styles.logo}
              source={require("../assets/pharma3.png")}
            />
          </View>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Trouvez vos médicaments</Text>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.text}>
              Avec My Meds, vérifier la disponibilité de vos
              médicaments dans les pharmacies autour de vous. 
            </Text>
          </View>
        </View>
        </LinearGradient>
         
        <LinearGradient
 colors={['hsla(176, 61%, 87%, 1)', 'hsla(150, 54%, 86%, 1)', 'hsla(242, 68%, 84%, 1)']}
 start={{ x: 0, y: 0 }}
 end={{ x: 1, y: 0 }}
 style={styles.gradient}
>
        <View style={styles.onboardingView}>
          <View style={styles.logoContainer}>
            <Image
              style={styles.logo}
              source={require("../assets/pharma3.png")}
            />
          </View>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Réservez en pharmacie</Text>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.text}>
              Vos médicaments sont disponibles près de chez vous ? Ils sont mis
              de côté en pharmacie pour vous, pendant 2 heures
            </Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate("Connect")}
            >
              <Text style={styles.buttonText}>Suivant</Text>
            </TouchableOpacity>
          </View>
        </View>
        </LinearGradient>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    maxwidth: "80%",
  },
  onboardingScrollView: {
    flex: 1,
  },
  onboardingView: {
    flex: 1,
    width: Dimensions.get("screen").width,
    justifyContent: "center",
    alignItems: "center",
  },
  video: {
    width: "100%",
    height: "100%",
  },
  logoContainer: {
    position: "absolute",
    top: 10,
    justifyContent: "center",
    alignItems: "center",
    width: "90%",
    height: "30%",
    padding: 10,
  },
  logo: {
    width: "100%",
    height: "80%",
    opacity: 0.9,
    marginLeft: 10,
    resizeMode: "contain",
  },
  logoContainer2: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "85%",
    top: -25,
    left: -6,
    margin: 0,
  },
  logo2: {
    width: "150%",
    height: "1680%",
    opacity: 0.9,
    resizeMode: "contain",
    top: 140,
  },
  titleContainer: {
    position: "absolute",
    bottom: 0,
    justifyContent: "center",
    width: "100%",
    padding: 10,
    top: 10,
  },
  icon: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    padding: 90,
    bottom: 80,
  },
  title: {
    fontSize: 38,
    color: "#5207E6",
    opacity: 0.9,
    margin: 33,
    textTransform: "uppercase",
  },
  title1Container: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    padding: 50,
    bottom: 10,
  },
  title1: {
    fontSize: 48,
    opacity: 0.9,
    color: "#5207E6",
    marginTop: 40,
  },
  textContainer: {
    position: "absolute",
    bottom: 170,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    padding: 10,
  },
  text: {
    fontSize: 20,
    color: "#5207E6",
    opacity: 0.9,
    margin: 33,
  },
  contentContainer3: {
    flex: 1,
    width: "100%",
    height: "100%",
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
  },
  logoContainer3: {
    alignItems: "center",
    width: "100%",
    height: "40%",
    top: -20,
  },
  buttonContainer2: {
    alignItems: "flex-end",
    justifyContent: "flex-end",
  },
  buttonContainer1: {
    alignItems: "center",
    justifyContent: "center",
    bottom: -25,
  },
  logo3: {
    width: "80%",
    height: "65%",
    opacity: 0.9,
    marginLeft: 10,
    resizeMode: "contain",
  },
  titleContainer3: {
    position: "absolute",
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    padding: 10,
    top: 10,
  },
  button1: {
    shadowOffset: { width: 5, height: 3 },
    shadowOpacity: 0.97,
    shadowRadius: 3,
    backgroundColor: "#88FF5B",
    width: 150,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  button3: {
    shadowOffset: { width: 5, height: 3 },
    shadowOpacity: 0.97,
    shadowRadius: 3,
    backgroundColor: "#88FF5B",
    width: 150,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
  },
  textButton: {
    color: "black",
    fontSize: 15,
    fontWeight: "bold",
    justifyContent: "center",
  },
  textButton2: {
    color: "white",
    fontSize: 15,
    fontWeight: "bold",
    justifyContent: "center",
  },
  textButton3: {
    color: "black",
    fontSize: 15,
    fontWeight: "bold",
    textAlign: "center",
  },
  button2: {
    shadowOffset: { width: 5, height: 3 },
    shadowOpacity: 0.97,
    shadowRadius: 3,
    backgroundColor: "#5207E6",
    width: 150,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 50,
    marginTop: 25,
  },
  button: {
    position: "absolute",
    bottom: -150,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  buttonText: {
    fontSize: 20,
    color: "#5207E6",
    textTransform: "uppercase",
    textShadowColor: "#88FF5B",
    textShadowOffset: { width: 3, height: 2 },
    textShadowRadius: 2,
    elevation: 10,
    overflow: "hidden",
  },
});
