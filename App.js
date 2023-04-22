import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import MeTab from "./screens/MeTab";
import Ionicons from "react-native-vector-icons/Ionicons";
import ContactsTab from "./screens/ContactsTab";
import AppProvider from "./context/AppState";
import LoginScreen from "./components/LogIn";
import SignUp from "./components/SignUp";

import { createStackNavigator } from "@react-navigation/stack";

const Tab = createBottomTabNavigator();
const TabNavigator = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: "black",
        inactiveTintColor: "gray",
      }}
    >
      <Tab.Screen
        name="Contacts"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="ios-list" size={size} color={color} />
          ),
        }}
        component={ContactsTab}
      />
      <Tab.Screen
        name="Me"
        component={MeTab}
        options={{
          tabBarLabel: "Me",
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="ios-person" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
export default function App() {
  const Stack = createStackNavigator();

  return (
    <AppProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="LogIn" component={LoginScreen} />
          <Stack.Screen name="SignUp" component={SignUp} />
          <Stack.Screen
            name="TabScreen"
            component={TabNavigator}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </AppProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
