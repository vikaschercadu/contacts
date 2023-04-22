import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import LoginScreen from "../components/LogIn";
import SignUp from "../components/SignUp";

function AuthNavigation(props) {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen name="LogIn" component={LoginScreen} />
      <Stack.Screen name="SignUp" component={SignUp} />
    </Stack.Navigator>
  );
}

export default AuthNavigation;
