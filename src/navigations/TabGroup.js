import React from 'react';
import { Image, StyleSheet } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import ListGroup from '../screens/authorized/home/group/ListGroup';
import ViewGroup from '../screens/authorized/home/group/ViewGroup';
import EditGroup from '../screens/authorized/home/group/EditGroup';
import GroupChat from '../screens/authorized/home/group/GroupChat';
import ListChat from '../screens/authorized/home/chat/ListChat';

const TabGroup = createStackNavigator({
    List: { 
        screen: ListGroup,
        navigationOptions: {
            tabBarIcon: ({ tintColor }) => <Image source={require('../img/icons/group.png')} style={[styles.icon, { tintColor }]} />
        }
    },
    groupchat: { screen: GroupChat },
    edit: { screen: EditGroup },
    viewgroup: { screen: ViewGroup },
    ListChat: { screen: ListChat}
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

export default TabGroup; 