import React from 'react';
import { Image } from 'react-native';
import { createBottomTabNavigator, TabView } from 'react-navigation';
import TabContact from './TabContact';
import TabChat from './TabChat';
import TabGroup from './TabGroup';
import TabProfile from './TabProfile';
const Home = createBottomTabNavigator(
    {
        TabChat: { 
            screen: TabChat,
            navigationOptions: {
                tabBarIcon: ({ tintColor }) => <Image source={require('../img/icons/chat.png')} style={[styles.icon, {tintColor}]} />
            }
        },
        TabGroup: { 
            screen: TabGroup,
            navigationOptions: {
                tabBarIcon: ({ tintColor }) => <Image source={require('../img/icons/group.png')} style={[styles.icon, {tintColor}]} />
            }
        },
        TabContact: {
            screen: TabContact,
            navigationOptions: {
                tabBarIcon: ({ tintColor }) => <Image source={require('../img/icons/contact.png')} style={[styles.icon, { tintColor }]} />
            }
        },
        TabProfile: { 
            screen: TabProfile,
            navigationOptions: {
                tabBarIcon: ({ tintColor }) => <Image source={require('../img/icons/menu.png')} style={[styles.icon, {tintColor}]} />
            }
        },

    },{
        headerMode:'screen',
        tabBarOptions:{
            activeTintColor:'black',
            inactiveTintColor:'grey',
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