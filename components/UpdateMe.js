import React, { useEffect } from "react";
import { View, StyleSheet, ScrollView, Alert } from "react-native";
import { Input, Image, Button } from "react-native-elements";
import appContext from "../context/appContext";
import ImageComponent from "./ImageComponent";
import * as File from "expo-file-system";

function UpdateMe(props) {
  const AppContext = React.useContext(appContext);
  const [firstName, setfirstName] = React.useState(AppContext.firstName);
  const [lastName, setlastName] = React.useState(AppContext.lastName);
  const [phone, setPhone] = React.useState(AppContext.phone);
  const [imageUri, setImageuri] = React.useState(AppContext.profileImage);

  const handleAdd = () => {
    AppContext.updateUser(firstName, lastName, phone, imageUri);
    props.navigation.navigate("User");
  };

  const getUri = async (uri) => {
    await File.copyAsync({
      from: uri,
      to: File.documentDirectory + uri.split("/").pop(),
    });
    setImageuri(File.documentDirectory + uri.split("/").pop());
  };

  const copyUri = async (uri) => {
    await File.copyAsync({
      from: uri,
      to: File.documentDirectory + uri.split("/").pop(),
    });
    setImageuri(File.documentDirectory + uri.split("/").pop());
  };

  return (
    <ScrollView>
      <View style={styles.screen}>
        {!!imageUri ? (
          <ImageComponent
            imageUri={imageUri}
            getUri={getUri}
            copyUri={copyUri}
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
        <Button
          buttonStyle={{ backgroundColor: "#fcacbc", width: 100 }}
          title="Done"
          onPress={handleAdd}
        />
      </View>
    </ScrollView>
  );
}
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
export default UpdateMe;
