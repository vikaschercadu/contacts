import React from "react";
import { View, StyleSheet, TouchableWithoutFeedback } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import appContext from "../context/appContext";

function RightAction(props) {
  return (
    <TouchableWithoutFeedback onPress={() => props.handleDelete(props.id)}>
      <View style={styles.container}>
        <MaterialCommunityIcons name="trash-can" size={35} color={"#fff"} />
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "red",
    width: 70,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default RightAction;
