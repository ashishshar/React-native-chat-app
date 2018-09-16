import React from 'react';
import { Image } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import ListChat from '../screens/authorized/home/chat/ListChat';
import RecentChat from '../screens/authorized/home/chat/RecentChat';
const TabChat = createStackNavigator({
    List: { 
        screen: ListChat,
        navigationOptions: {
            tabBarIcon: ({ tintColor }) => <Image source={require('../img/icons/chat.png')} style={[styles.icon, { tintColor }]} />
        }
    },
    RecentChat: { screen: RecentChat }
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