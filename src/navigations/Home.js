import React from 'react';
import { Image, StyleSheet } from 'react-native';
import { TabNavigator, TabView } from 'react-navigation';
import TabContact from './TabContact';
import TabChat from './TabChat';
import TabGroup from './TabGroup';
const Home = TabNavigator(
    {
        TabContact: { 
            screen: TabContact, 
            navigationOptions:{
                    tabBarLabel:'Contacts',
                    tabBarIcon: ({tintColor}) => <Image source={ require('../img/icons/contact.png') } style={ [styles.icon, {tintColor}]} />
            } 
        },
        TabChat: { 
            screen: TabChat,
            navigationOptions: {
                tabBarLabel: 'Chat',
                tabBarIcon: ({ tintColor }) => <Image source={require('../img/icons/chat.png')} style={[styles.icon, {tintColor}]} />
            }
        },
        TabGroup: { 
            screen: TabGroup,
            navigationOptions: {
                tabBarLabel: 'Group',
                tabBarIcon: ({ tintColor }) => <Image source={require('../img/icons/group.png')} style={[styles.icon, {tintColor}]} />
            }
        },

    },{
        headerMode:'screen',
        tabBarOptions:{
            activeTintColor:'blue',
            inactiveTintColor:'red',
            // activeBackgroundColor:'yellow'
        },
        tabBarPosition:'bottom',
    }
);

const styles = {
    container: {
        flex: 1,
    },
    icon:{
        width:34,
        height:34
    }

}

export default Home;