import React, { useReducer } from "react";
import AppContext from "./appContext";
import appReducer from "./appReducer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import list from "../assets/List.js";
export default (props) => {
  const intialState = {
    email: "",
    token: null,
    contacts: [],
    userFirstName: "",
    userLastName: "",
    profileImage:
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAM1BMVEXk5ueutLeqsbTn6eqpr7PJzc/j5ebf4eLZ3N2wtrnBxsjN0NLGysy6v8HT1tissra8wMNxTKO9AAAFDklEQVR4nO2d3XqDIAxAlfivoO//tEOZWzvbVTEpic252W3PF0gAIcsyRVEURVEURVEURVEURVEURVEURVEURVEURVEURflgAFL/AirAqzXO9R7XNBVcy9TbuMHmxjN6lr92cNVVLKEurVfK/zCORVvW8iUBnC02dj+Wpu0z0Y6QlaN5phcwZqjkOkK5HZyPAjkIjSO4fIdfcOwFKkJlX4zPu7Ha1tIcwR3wWxyFhRG6g4Je0YpSPDJCV8a2Sv2zd1O1x/2WMDZCwljH+clRrHfWCLGK8REMiql//2si5+DKWKcWeAGcFMzzNrXC/0TUwQ2s6+LhlcwjTMlYsUIQzPOCb7YBiyHopyLXIEKPEkI/TgeuiidK/R9FniUDOjRDpvm0RhqjMyyXNjDhCfIMYl1gGjIMIuYsnGEYRMRZOMMunaLVwpWRW008v6fYKDIzxCwVAeNSO90BJW6emelYBRF/kHpYGVaoxTDAaxOFsfP9y8hpJ4xd7gOcij7JNGQ1EYFgkPJa1jQEiYZXRaRINKxSDUW9n+FT82lSKadkiru9/4XPqSLWOekGPoY05TAvLm9orm+YWuwHoBHkZKijNBJGmeb61eL6Ff/6q7bLr7yvv3vKGhpDRjvgjGaPz+gUg6YgcvpyAR2FIZ9U6nEEyZRTovmEU32KichpGn7C17XrfyH9gK/c0CMP05HZIM2uf9sEveizKveBy9/6Qt7o89ne33D525cfcIMW6ab+TMEukQbQbu+xu7X3A9bChmWaCeAkG17bpntwXgWxHaMzGPmUaR5dQZiKqRVeUZ3047fi3nAu28h4CHxCsZAgmEH8Y27jJAhm8c+5RQzRQNVGhVFSfxOYIjp/pP7RxzjevYXVGf4eLt+BJ1vCuLuLkrgABgCGXZ2wik5uty+oBvNirI6mkzhAf4Gsb58Hcm67Jzd+KwD10BYPLL3e0MjvKrgAULnOfveF/O4N2Xb9BZom3gJes3F9X5Zze8/6Yt09b4CrqsEjUv8oFBaR2rl+6CZr2xVrp24o/WitBKuGrrpl1+bFkmK2qXTON4VpbdfLa7o7y/WdLxG7lm2Lqh2clOwTegbvc/vj2U78CwhA87Bn8G5Nk3eOb0Nsr9flz3sG78UUtue4kpv1xvjg3TMay62BMlTlP+vrOMnJsRmt/ze0jsfkPPYdAH57hK+34PeOyc8XIXu5xT2HsUkdZz+adwg8HGFfQ3K5jtDvbUiO4Di9/ywHGrL88pDizZ++oTp+an+SMX/ndymUCwmHMdO7yuOx83pUx/eEMU0AvxWndwgidAqOZ8ypCwdEfvvEo6D9HwpA8wzvmOJEqAg9ySu8g4x0Hb9hSB/BANEKJ+LbPBU0lzbAJs4xt1AoshKkUGQmiH8/jJ0gdhTTLmSegHlPE0oOdXALnqDjKYh3px//fSgSWG8UqfrrIICzYYSJXRr9BSPbpNzw7gBjKjKOYI7ReIGqQRIap5+5MdjyvuDkExvGeXSlONWZAP3/AZBwJohU7QJRGU+cTVH18ELmRPNBmibW6MT/k1b0XhdkRBvyT6SB6EYv/GvhSmRNpGngRULsAlxMCGNXp7w3FfdEbTEEDdLI9TdIKRUzUesa3I461ER8cpNT7gMRhpKmYVS9ELOgCUQsa4SsulciKiLbY+AnHD8cpuhISsnxpamI84sbDq9qYJgf8wiiOBrC7Ml7M7ZECCqKoiiKoiiKoiiKoijv5AvJxlZRyNWWLwAAAABJRU5ErkJggg==",
    userphone: "",
  };

  const [state, dispatch] = useReducer(appReducer, intialState);

  const updateUser = async (
    firstName = "",
    lastName = "",
    phone = "",
    profileImage = ""
  ) => {
    const user = JSON.parse(await AsyncStorage.getItem("userData"));
    user.firstName = firstName;
    user.lastName = lastName;
    user.phone = phone;
    user.profileImage = profileImage;
    await AsyncStorage.setItem("userData", JSON.stringify(user));
    dispatch({
      type: "UPDATE_USER",
      payload: {
        firstName,
        lastName,
        profileImage,
        phone,
      },
    });
  };
  const loadContacts = async () => {
    try {
      const res = await fetch(
        "https://react-native-cef36-default-rtdb.firebaseio.com/contacts.json"
      );
      const resData = await res.json();
      const fetchedcontacts = [];
      for (let key in resData) {
        const c = resData[key];
        fetchedcontacts.push({ ...c, id: key });
      }
      dispatch({
        type: "LOAD_CONTACTS",
        payload: { contacts: fetchedcontacts },
      });
    } catch (err) {
      console.log(err);
    }
  };

  const addUser = async (contact) => {
    try {
      const res = await fetch(
        "https://react-native-cef36-default-rtdb.firebaseio.com/contacts.json",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            firstName: contact.firstName,
            lastName: contact.lastName,
            phone: contact.phone,
            email: contact.email,
            ownerEmail: contact.ownerEmail,
            imageUri: contact.imageUri,
          }),
        }
      );
      loadContacts();
    } catch (err) {
      console.log(err);
    }

    dispatch({
      type: "ADD_CONTACT",
      payload: {
        contact,
      },
    });
  };

  const deleteUser = async (id) => {
    await fetch(
      `https://react-native-cef36-default-rtdb.firebaseio.com/contacts/${id}.json`,
      {
        method: "DELETE",
      }
    );
    dispatch({
      type: "DELETE_CONTACT",
      payload: {
        id,
      },
    });
  };

  const editUser = async (contact, id) => {
    try {
      const res = await fetch(
        `https://react-native-cef36-default-rtdb.firebaseio.com/contacts/${id}.json`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            firstName: contact.firstName,
            lastName: contact.lastName,
            phone: contact.phone,
            email: contact.email,
            imageUri: contact.imageUri,
          }),
        }
      );
    } catch (err) {
      console.log(err);
    }

    dispatch({
      type: "EDIT_CONTACT",
      payload: {
        id,
        contact,
      },
    });
  };

  const setUser = ({ email, token }) => {
    dispatch({
      type: "SET_USER",
      payload: { email, token },
    });
  };

  const signupUser = async ({ email, token }) => {
    await AsyncStorage.setItem("userData", JSON.stringify({ email, token }));
    dispatch({
      type: "SIGN_USER",
      payload: {
        email,
        token,
      },
    });
  };

  const removeUser = async () => {
    try {
      await AsyncStorage.removeItem("userData");
      dispatch({
        type: "REMOVE_USER",
      });
    } catch (err) {
      throw new Error(err.message);
    }
  };
  const { email, token, contacts, firstName, lastName, phone, profileImage } =
    state;
  return (
    <AppContext.Provider
      value={{
        email: email,
        token: token,
        contacts,
        firstName,
        lastName,
        phone,
        profileImage,
        addUser,
        deleteUser,
        editUser,
        setUser,
        removeUser,
        loadContacts,
        updateUser,
        signupUser,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};
