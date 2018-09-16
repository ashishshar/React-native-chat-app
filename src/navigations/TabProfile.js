import React from 'react';
import { Image, StyleSheet } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import ViewProfile from '../screens/authorized/home/profile/ViewProfile';
import EditProfile from '../screens/authorized/home/profile/EditProfile';
import { TabNavigator } from 'react-navigation';
const TabProfile = createStackNavigator({
    List: { 
        screen: ViewProfile,
        navigationOptions: {
            tabBarIcon: ({ tintColor }) => <Image source={require('../img/icons/menu.png')} style={[styles.icon, { tintColor }]} />
        }
    },
    edit: { screen: EditProfile }
});

const styles = {
    container: {
        flex: 1,
    },
    icon: {
        width: 34,
        height: 34
    }

}

export default TabProfile; 