import React from "react";
import { StyleSheet, ActivityIndicator, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import appContext from "../context/appContext";

const Welcome = (props) => {
  const AppContext = React.useContext(appContext);
  React.useEffect(() => {
    const checkuser = async () => {
      const { token, email } = await AsyncStorage.getItem("userData");
      if (token && email) {
        AppContext.setUser({ email, token });
        props.navigation.replace("TabScreen");
      } else {
        props.navigation.replace("LogIn");
      }
    };
    checkuser();
  }, []);
  return (
    <View style={styles.screen}>
      <ActivityIndicator size={35} />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Welcome;
