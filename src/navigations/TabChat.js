import React from 'react';
import { Image, StyleSheet } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import ListChat from '../screens/authorized/home/chat/ListChat';
import AddChat from '../screens/authorized/home/chat/AddChat';
import EditChat from '../screens/authorized/home/chat/EditChat';
import ViewChat from '../screens/authorized/home/chat/ViewChat';
import { TabNavigator } from 'react-navigation';
const TabChat = createStackNavigator({
    List: { 
        screen: ListChat,
        navigationOptions: {
            tabBarLabel: 'Chat',
            tabBarIcon: ({ tintColor }) => <Image source={require('../img/icons/chat.png')} style={[styles.icon, { tintColor }]} />
        }
    },
    Add: { screen: AddChat },
    edit: { screen: EditChat },
    View: { screen: ViewChat }
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

export default TabChat; 