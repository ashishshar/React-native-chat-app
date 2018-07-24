import React from 'react';
import { Image, StyleSheet } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import ListGroup from '../screens/authorized/home/group/ListGroup';
import AddGroup from '../screens/authorized/home/group/AddGroup';
import EditGroup from '../screens/authorized/home/group/EditGroup';
import GroupChat from '../screens/authorized/home/group/GroupChat';

const TabGroup = createStackNavigator({
    List: { 
        screen: ListGroup,
        navigationOptions: {
            tabBarLabel: 'Group',
            tabBarIcon: ({ tintColor }) => <Image source={require('../img/icons/group.png')} style={[styles.icon, { tintColor }]} />
        }
    },
    groupchat: { screen: GroupChat },
    edit: { screen: EditGroup },
    add: { screen: AddGroup }
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