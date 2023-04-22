import React from "react";
import { View, StyleSheet, TouchableWithoutFeedback } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

function LeftAction(props) {
  return (
    <TouchableWithoutFeedback onPress={() => props.leftNavigate(props)}>
      <View style={styles.container}>
        <MaterialCommunityIcons name="account-edit" size={35} color={"#fff"} />
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#77ACF1",
    width: 70,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default LeftAction;
