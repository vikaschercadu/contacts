import React from "react";
import { TouchableWithoutFeedback } from "react-native";
import { View, StyleSheet, Modal, Image } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

function ImageComponent(props) {
  const [isvisible, setVisible] = React.useState(false);

  const handleCamera = async () => {
    try {
      const { granted } = await ImagePicker.requestCameraPermissionsAsync();
      if (granted) {
        const path = await ImagePicker.launchCameraAsync({
          allowsEditing: true,
          quality: 0.5,
        });
        props.getUri(path.uri);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleGallery = async () => {
    const { granted } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (granted) {
      const { uri } = await ImagePicker.launchImageLibraryAsync();
      props.copyUri(uri);
    }
  };

  return (
    <View style={styles.screen}>
      {props.imageUri ? (
        <TouchableWithoutFeedback onPress={() => setVisible(true)}>
          <Image source={{ uri: props.imageUri }} style={styles.image} />
        </TouchableWithoutFeedback>
      ) : (
        <TouchableWithoutFeedback onPress={() => setVisible(true)}>
          <MaterialCommunityIcons name="camera-image" size={70} />
        </TouchableWithoutFeedback>
      )}
      <Modal transparent={true} visible={isvisible} animationType="slide">
        <View style={styles.modal}>
          <View style={styles.icon}>
            <TouchableWithoutFeedback onPress={handleGallery}>
              <MaterialCommunityIcons name="file-account" size={60} />
            </TouchableWithoutFeedback>
          </View>
          <View style={styles.icon}>
            <TouchableWithoutFeedback onPress={handleCamera}>
              <MaterialCommunityIcons name="camera-iris" size={60} />
            </TouchableWithoutFeedback>
          </View>
          <TouchableWithoutFeedback onPress={() => setVisible(false)}>
            <MaterialCommunityIcons name="close" size={40} />
          </TouchableWithoutFeedback>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    height: 140,
    width: 140,
    borderRadius: 70,
    backgroundColor: "white",
    marginBottom: 20,
    marginTop: 20,
  },
  modal: {
    flexDirection: "row",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 350,
    width: 370,
    height: 150,
    borderRadius: 20,
    overflow: "hidden",
    padding: 10,
    backgroundColor: "#fcacbc",
  },
  icon: {
    margin: 15,
    width: 100,
    borderRadius: 50,
    height: 100,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#B6C867",
  },
  image: {
    borderRadius: 70,
    width: 140,
    height: 140,
    marginBottom: 20,
  },
});

export default ImageComponent;
