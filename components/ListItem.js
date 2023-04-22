import React from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  TouchableHighlight,
} from "react-native";
import AppText from "./AppText";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { useNavigation } from "@react-navigation/native";
import appContext from "../context/appContext";
function ListItem({
  email,
  phone,
  firstName,
  lastName,
  id,
  imageUri,
  IconComponent,
  renderRightActions,
  renderLeftActions,
}) {
  const AppContext = React.useContext(appContext);
  const handleDelete = (id) => {
    AppContext.deleteUser(id);
  };

  const navigation = useNavigation();
  const handleleftAction = () => {
    navigation.navigate("Add Contact", {
      user: {
        firstName,
        lastName,
        phone,
        email,
        imageUri,
        id,
      },
    });
  };
  return (
    <Swipeable
      renderLeftActions={() =>
        renderLeftActions({ leftNavigate: handleleftAction, id })
      }
      renderRightActions={() => renderRightActions({ handleDelete, id })}
    >
      <TouchableHighlight
        underlayColor="fafbfc"
        onPress={() =>
          navigation.navigate("User Screen", {
            user: {
              firstName,
              lastName,
              phone,
              email,
              imageUri,
            },
          })
        }
      >
        <View style={styles.container}>
          {IconComponent}
          {imageUri && (
            <Image style={styles.image} source={{ uri: imageUri }} />
          )}
          <View style={styles.detailsContainer}>
            <AppText style={styles.title}>{firstName}</AppText>
            <AppText style={styles.subTitle}>{phone}</AppText>
          </View>
        </View>
      </TouchableHighlight>
    </Swipeable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 15,
    backgroundColor: "#fff",
  },
  detailsContainer: {
    marginLeft: 10,
    justifyContent: "center",
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },
  subTitle: {
    color: "#cacaca",
  },
  title: {
    fontWeight: "500",
  },
});

export default ListItem;
