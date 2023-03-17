import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import BienvenuScreen from './screens/BienvenuScreen';
import ProfileScreen from './screens/ProfileScreen';
import ConnectionScreen from './screens/ConnectionScreen';
import FindScreen from './screens/FindScreen';

import SignUpScreen from "./screens/SignUpScreen";
import MesMedicamentsScreen from "./screens/MesMedicamentsScreen";
import MesOrdonnancesScreen from "./screens/MesOrdonnancesScreen";
import MesPharmaciesScreen from "./screens/MesPharmaciesScreen";
import MesReservationsScreen from "./screens/MesReservationsScreen";
import ParametreScreen from "./screens/ParametreScreen";
import CameraScreen from "./screens/CameraScreen";
import CameraCniScreen from "./screens/CameraCniScreen";
import PharmResultScreen from "./screens/PharmResultScreen";
import MedResultScreen from "./screens/MedResultScreen";
import MapScreen from "./screens/MapScreen";

import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import user from './reducers/user';
import { LogBox } from 'react-native';

LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();//Ignore all log notifications

const store = configureStore({
  reducer: { user },
});

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => { 
  return (
  <Tab.Navigator screenOptions={({ route }) => ({
    tabBarIcon: ({ color, size }) => {
      let iconName = '';

      if (route.name === 'Profil') {
        iconName = 'user-circle';
      } else if (route.name === 'Rechercher') {
        iconName = 'search';
      }

      return <FontAwesome name={iconName} size={size} color={color} />;
    },
    tabBarActiveTintColor: '#88FF5B',
    tabBarInactiveTintColor: '#5207E6',
    headerShown: false,
 
  })}>
    <Tab.Screen name="Profil" component={ProfileScreen} />
    <Tab.Screen name="Rechercher" component={FindScreen} />
   
  </Tab.Navigator>
  );
};

export default function App() {
  /*/  const [inputValue, setInputValue] = React.useState('');

const handleInputChange = (text) => {
    setInputValue(text);
  };

  const handleButtonClick = () => {
    console.log('Button clicked');
  };
 /*/ 

  return (
  <Provider store={store}>
  
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>  
        <Stack.Screen name="Bienvenu" component={BienvenuScreen}/>
        <Stack.Screen name="Connect" component={ConnectionScreen}/>
        <Stack.Screen name="SignUp" component={SignUpScreen}/>
        <Stack.Screen name="TabNavigator" component={TabNavigator}/>
        <Stack.Screen name="Rechercher" component={FindScreen}/>
        <Stack.Screen name="Mes Medicaments" component={MesMedicamentsScreen}/>
        <Stack.Screen name="Mes Ordonnances" component={MesOrdonnancesScreen}/>
        <Stack.Screen name="Mes Pharmacies" component={MesPharmaciesScreen}/>
        <Stack.Screen name="Mes Reservations" component={MesReservationsScreen}/>
        <Stack.Screen name="Parametre" component={ParametreScreen}/>
        <Stack.Screen name="Resultats Pharmacies" component={PharmResultScreen}/>
        <Stack.Screen name="Resultats Medicaments" component={MedResultScreen}/>
        <Stack.Screen name="Map" component={MapScreen}/>
        <Stack.Screen name="Camera" component={CameraScreen}/>
        <Stack.Screen name="CameraCni" component={CameraCniScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  
   </Provider>
  );
}



