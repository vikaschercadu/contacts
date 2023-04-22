import React from "react";
import { Platform } from "react-native";
import { Text } from "react-native";


const defaultStyles =  {
  text: {
    color: 'brown',
    fontSize: 18,
    fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir",
  },
};


function AppText({ children, style }) {
  return <Text style={[defaultStyles.text, style]}>{children}</Text>;
}


export default AppText;
