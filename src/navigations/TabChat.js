import React from 'react';
import { Image } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import ListChat from '../screens/authorized/home/chat/ListChat';
import Conversation from '../screens/authorized/home/contact/Conversation';
import GroupChat from '../screens/authorized/home/group/GroupChat';
import { TabNavigator } from 'react-navigation';
const TabChat = createStackNavigator({
    List: { 
        screen: ListChat,
        navigationOptions: {
            tabBarLabel: 'Chat',
            tabBarIcon: ({ tintColor }) => <Image source={require('../img/icons/chat.png')} style={[styles.icon, { tintColor }]} />
        }
    },
    Conversation: { screen: Conversation },
    GroupChat: { screen: GroupChat }
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