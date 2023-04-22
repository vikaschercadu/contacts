import React, { useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import { Button } from "react-native-elements";
import ContactsList from "../components/ContactsList";
import Ionicons from "react-native-vector-icons/Ionicons";
import appContext from "../context/appContext";
const ContactsScreen = (props) => {
  const AppContext = React.useContext(appContext);
  const handleNavigation = (route, params) => {
    props.navigation.navigate(route, params);
  };

  React.useEffect(() => {
    AppContext.loadContacts();
  }, []);
  return (
    <View style={styles.screen}>
      <Button
        icon={<Ionicons name="ios-person-add" size={15} color="white" />}
        buttonStyle={styles.button}
        title=" ADD CONTACT"
        onPress={() => props.navigation.navigate("Add Contact")}
      />
      <ContactsList handleNavigation={handleNavigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    marginTop: 20,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  buttonContainer: {
    width: 200,
    height: 50,
    padding: 10,
  },
  button: {
    width: 200,
    height: 50,
    padding: 10,
    borderRadius: 50,
  },
});

export default ContactsScreen;
