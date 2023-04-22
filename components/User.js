import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { Image, Button } from "react-native-elements";

const User = (props) => {
  var user;
  if (props.route.params) {
    var { user } = props.route.params;
  } else {
    user = {
      firstName: "Chaitanya",
      lastName: "B M",
      phone: "1234567990",
      email: "mailme@bmchaitu.tech",
    };
  }
  return (
    <View style={styles.screen}>
      <View style={styles.container}>
        <Image
          source={
            user.imageUri
              ? { uri: user.imageUri }
              : require("../assets/dwayne-the-rock-.jpg")
          }
          style={styles.image}
        />
        <View style={styles.textContainer}>
          <View style={styles.detailsContainer}>
            <Text adjustsFontSizeToFit style={{ fontSize: 20, color: "gray" }}>
              First Name
            </Text>
          </View>
          <View style={styles.detailsContainer}>
            <Text adjustsFontSizeToFit style={{ fontSize: 23 }}>
              {user.firstName}
            </Text>
          </View>
        </View>
        <View style={styles.textContainer}>
          <View style={styles.detailsContainer}>
            <Text adjustsFontSizeToFit style={{ fontSize: 20, color: "gray" }}>
              Last Name
            </Text>
          </View>
          <View style={styles.detailsContainer}>
            <Text adjustsFontSizeToFit style={{ fontSize: 18 }}>
              {user.lastName}
            </Text>
          </View>
        </View>
        <View style={styles.textContainer}>
          <View style={styles.detailsContainer}>
            <Text adjustsFontSizeToFit style={{ fontSize: 20, color: "gray" }}>
              Phone
            </Text>
          </View>
          <View style={styles.detailsContainer}>
            <Text adjustsFontSizeToFit style={{ fontSize: 18 }}>
              {user.phone}
            </Text>
          </View>
        </View>
        <View style={styles.textContainer}>
          <View style={styles.detailsContainer}>
            <Text style={{ fontSize: 20, color: "gray" }}>Email-ID</Text>
          </View>
          <View style={styles.detailsContainer}>
            <Text adjustsFontSizeToFit style={{ fontSize: 18 }}>
              {user.email}
            </Text>
          </View>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Button
            buttonStyle={{ margin: 50, backgroundColor: "#fcacbc", width: 100 }}
            title="Done"
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    alignItems: "center",
    marginTop: 10,
  },
  container: {
    backgroundColor: "#9fe6a0",
    overflow: "hidden",
    alignItems: "center",
    elevation: 1,
    paddingTop: 10,
    width: 380,
    height: 730,
    borderRadius: 20,
    borderColor: "#0a81ab",
    borderWidth: 2,
  },
  image: {
    width: 350,
    height: 250,
    marginBottom: 20,
    borderRadius: 20,
  },
  textContainer: {
    width: 350,
    margin: 5,
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  detailsContainer: {
    width: 150,
    height: 50,
    justifyContent: "center",
    alignItems: "flex-start",
    overflow: "hidden",
  },
});

export default User;
