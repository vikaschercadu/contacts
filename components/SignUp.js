import React, { Component } from "react";

import styles from "./Style";
import {
  Keyboard,
  Text,
  View,
  TouchableWithoutFeedback,
  Alert,
  KeyboardAvoidingView,
} from "react-native";
import { Button } from "react-native-elements";
import AppTextInput from "../components/AppTextInput";
import appContext from "../context/appContext";

const SignUp = (props) => {
  var AppContext = React.useContext(appContext);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const handleSubmit = async () => {
    if (email.trim().length == 0 || password.trim().length == 0)
      return Alert.alert("Error", "PLease fill alll details");
    if (password.length <= 5)
      Alert.alert("Error", "Weak Password, it should be atleast 5 characters");

    try {
      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDPjOz4KUp0NIpaZJR9pbaVJH-jXlkq0mk",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            password: password,
            returnSecureToken: true,
          }),
        }
      );
      if (response.ok) {
        const { email, idToken } = await response.json();
        AppContext.signupUser({ email, token: idToken });
        props.navigation.replace("TabScreen");
      } else {
        const resData = await response.json();
        Alert.alert("Error", resData.error.message);
      }
    } catch (err) {
      Alert.alert("Error", err.message);
    }
  };
  return (
    <KeyboardAvoidingView style={styles.containerView} behavior="padding">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.loginScreenContainer}>
          <View style={styles.loginFormView}>
            <Text style={styles.logoText}>Mobile App</Text>
            <AppTextInput
              placeholder="Username"
              placeholderColor="#c4c3cb"
              value={email}
              onChangeText={(text) => setEmail(text)}
            />
            <AppTextInput
              value={password}
              onChangeText={(text) => setPassword(text)}
              placeholder="Password"
              placeholderColor="#c4c3cb"
              secureTextEntry={true}
            />
            <Button
              buttonStyle={styles.loginButton}
              onPress={() => handleSubmit()}
              title="Register"
            />
            <Button
              buttonStyle={{ marginTop: 20 }}
              title="Move To LoginScreen"
              onPress={() => props.navigation.replace("LogIn")}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};
export default SignUp;
