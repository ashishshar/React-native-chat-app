import React from 'react';
import { Image, StyleSheet } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import ListGroup from '../screens/authorized/home/group/ListGroup';
import AddGroup from '../screens/authorized/home/group/AddGroup';
import EditGroup from '../screens/authorized/home/group/EditGroup';
import ViewGroup from '../screens/authorized/home/group/ViewGroup';

const TabGroup = createStackNavigator({
    List: { 
        screen: ListGroup,
        navigationOptions: {
            tabBarLabel: 'Group',
            tabBarIcon: ({ tintColor }) => <Image source={require('../img/icons/group.png')} style={[styles.icon, { tintColor }]} />
        }
    },
    Add: { screen: AddGroup },
    edit: { screen: EditGroup },
    View: { screen: ViewGroup }
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