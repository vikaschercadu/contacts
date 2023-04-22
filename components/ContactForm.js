import React, { useEffect } from "react";
import { View, StyleSheet, ScrollView, Alert } from "react-native";
import { Input, Image, Button } from "react-native-elements";
import appContext from "../context/appContext";
import ImageComponent from "./ImageComponent";
import * as File from "expo-file-system";

const ContactForm = (props) => {
  const AppContext = React.useContext(appContext);
  if (props.route.params) var { user } = props.route.params;
  else
    var user = {
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      imageUri: false,
    };
  const [firstName, setfirstName] = React.useState(user.firstName);
  const [lastName, setlastName] = React.useState(user.lastName);
  const [phone, setPhone] = React.useState(user.phone);
  const [email, setEmail] = React.useState(user.email);
  const [imageUri, setImageuri] = React.useState(user.imageUri);
  const [move, setMove] = React.useState("");

  const handleAdd = () => {
    if (firstName.length == 0)
      return Alert.alert("Error", "Please fill First Name");
    if (lastName.length == 0)
      return Alert.alert("Error", "Please fill Last Name");
    if (phone.length == 0 || phone.length < 10 || phone.length > 10)
      return Alert.alert("Error", "Please fill Contact Properly");
    if (email.length == 0) return Alert.alert("Error", "Please Fill Email ID");

    if (!imageUri) return Alert.alert("Error", "Please take/select a picture");
    const contact = {
      firstName,
      lastName,
      phone: phone,
      email: email,
      ownerEmail: AppContext.email,
    };

    var newPath = "";
    if (user.imageUri !== imageUri) {
      if (move) {
        newPath = File.documentDirectory + imageUri.split("/").pop();
        File.moveAsync({
          from: imageUri,
          to: newPath,
        })
          .then((mes) => {})
          .catch((err) => console.log(err));
      } else {
        newPath = File.documentDirectory + imageUri.split("/").pop();
        File.copyAsync({
          from: imageUri,
          to: newPath,
        })
          .then((mes) => {})
          .catch((err) => console.log(err));
      }
      contact.imageUri = newPath;
    } else contact.imageUri = user.imageUri;

    if (props.route.params) {
      AppContext.editUser(contact, user.id);
      props.navigation.navigate("Contacts");
    } else {
      AppContext.addUser(contact).then(() =>
        props.navigation.navigate("Contacts")
      );
    }
  };

  const getUri = (uri) => {
    setImageuri(uri);
    setMove(true);
  };

  const copyUri = (uri) => {
    setImageuri(uri);
    setMove(false);
  };
  return (
    <ScrollView>
      <View style={styles.screen}>
        {imageUri ? (
          <ImageComponent
            getUri={getUri}
            copyUri={copyUri}
            imageUri={imageUri}
          />
        ) : (
          <ImageComponent getUri={getUri} copyUri={copyUri} />
        )}

        <Input
          labelStyle={styles.label}
          label="First Name"
          placeholder="Enter First Name"
          value={firstName}
          onChangeText={(text) => setfirstName(text)}
        />
        <Input
          labelStyle={styles.label}
          label="Last Name"
          placeholder="Enter Last Name"
          value={lastName}
          onChangeText={(text) => setlastName(text)}
        />
        <Input
          labelStyle={styles.label}
          keyboardType="number-pad"
          label="Mobile Number"
          placeholder="Enter Phone Number"
          value={phone}
          onChangeText={(text) => setPhone(text)}
        />
        <Input
          labelStyle={styles.label}
          label="E-mail"
          placeholder="Enter E-mail Address"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <Button
          buttonStyle={{ backgroundColor: "dodgerblue", width: 100 }}
          title="Done"
          onPress={handleAdd}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    marginTop: 10,
    padding: 50,
    paddingTop: 10,
  },
  inputContainer: {
    width: 300,
    height: 40,
    margin: 15,
    padding: 10,
  },
  image: {
    borderRadius: 70,
    width: 140,
    height: 140,
    marginBottom: 20,
  },
  label: { color: "black" },
});
export default ContactForm;
