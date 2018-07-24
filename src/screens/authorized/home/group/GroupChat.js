import React, { Component } from 'react'
import {
    StyleSheet,
    View,
    Text,
    ListView,
    Image
} from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
class GroupChat extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: navigation.state.params.groupDetail.Name
    })
    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>View Contact</Text>
            </View>
        )
    }
}

export default GroupChat;