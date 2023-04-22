import React from 'react';
import {StyleSheet} from 'react-native';
import {View} from 'react-native';
import User from '../components/User';
const UserScreen = (props) => {
    return(
        <View style={styles.screen}>
            <User user="My user" />
        </View>
    )
};

const styles = StyleSheet.create({
    screen:{
        flex:1,
        marginTop:50
    }
});

export default UserScreen;