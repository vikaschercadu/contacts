import React, { Component, useEffect } from "react";
import appContext from "../context/appContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "./Style";
import {
  Keyboard,
  Text,
  View,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
} from "react-native";
import { Button } from "react-native-elements";
import AppTextInput from "../components/AppTextInput";
import { Alert } from "react-native";

const LoginScreen = (props) => {
  const AppContext = React.useContext(appContext);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  useEffect(() => {
    const checkuser = async () => {
      try {
        const res = await AsyncStorage.getItem("userData");
        if (res) {
          let { email, token, firstName, lastName, phone, profileImage } =
            JSON.parse(res);
          AppContext.signupUser({ email, token });
          props.navigation.replace("TabScreen");
        }
      } catch (error) {
        console.log(error);
      }
    };
    checkuser();
  }, [props]);

  const onLoginPress = async () => {
    if (email.trim().length == 0 || password.trim().length == 0)
      return Alert.alert("Error", "PLease fill alll details");
    if (password.length <= 5)
      Alert.alert("Error", "Weak Password, it should be atleast 5 characters");

    try {
      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDPjOz4KUp0NIpaZJR9pbaVJH-jXlkq0mk",
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
        const resData = await response.json();
        AppContext.signupUser({ email: resData.email, token: resData.idToken });
        await AsyncStorage.setItem(
          "userData",
          JSON.stringify({ email: resData.email, token: resData.idToken })
        );
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
              value={email}
              onChangeText={(text) => setEmail(text)}
              placeholder="Username"
              placeholderColor="#c4c3cb"
            />
            <AppTextInput
              value={password}
              placeholder="Password"
              placeholderColor="#c4c3cb"
              secureTextEntry={true}
              onChangeText={(text) => setPassword(text)}
            />
            <Button
              buttonStyle={styles.loginButton}
              onPress={onLoginPress}
              title="Login"
            />
            <Button
              buttonStyle={{
                ...styles.loginButton,
                backgroundColor: "brown",
              }}
              title="Signup to Register Account"
              onPress={() => props.navigation.replace("SignUp")}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;
