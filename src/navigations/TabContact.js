import React from 'react';
import { Image } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import ListContact from '../screens/authorized/home/contact/ListContact';
//import AddContact from '../screens/authorized/home/contact/AddContact';
import Conversation from '../screens/authorized/home/contact/Conversation';
//import ViewContact from '../screens/authorized/home/contact/ViewContact';
import { TabNavigator } from 'react-navigation';
const TabContact = createStackNavigator({
    List:{
        screen:ListContact,
        navigationOptions: {
            tabBarLabel: 'Contacts',
            tabBarIcon: ({ tintColor }) => <Image source={require('../img/icons/contact.png')} style={[styles.icon, { tintColor }]} />
        } 
    },
    //Add : { screen : AddContact },
    Conversation :{ screen : Conversation }
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


export default TabContact; 