import { View, FlatList, StyleSheet, Text, Image, Button } from "react-native";
import React from "react";
import appContext from "../context/appContext";

import ListItem from "./ListItem";
import RightAction from "./RightAction";
import LeftAction from "./LeftAction";

const ContactsList = (props) => {
  const AppContext = React.useContext(appContext);
  const contactslist = AppContext.contacts;
  const leftNavigate = (id) => props.handleNavigation("Add Contact");
  return (
    <View style={styles.contactsscreen}>
      <FlatList
        keyExtractor={(item, index) => index.toString()}
        data={contactslist}
        renderItem={({ item }) => (
          <ListItem
            email={item.email}
            phone={item.phone}
            firstName={item.firstName}
            leftNavigate={leftNavigate}
            imageUri={item.imageUri}
            lastName={item.lastName}
            renderRightActions={RightAction}
            id={item.id}
            renderLeftActions={LeftAction}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  contactsscreen: {
    backgroundColor: "#fff",
    width: 370,
    marginTop: 10,
    marginBottom: 60,
  },
  listitem: {
    padding: 5,
    height: 80,
    flexDirection: "row",
    borderColor: "black",
    borderBottomWidth: 1,
  },
  image: {
    height: 70,
    width: 70,
    borderRadius: 35,
  },
  info: {
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: 50,
  },
});
export default ContactsList;
