import React, { Component } from 'react'
import {
    StyleSheet,
    View,
    Text,
    ListView,
    TouchableOpacity,
    Image
} from 'react-native';
//import { GiftedChat } from 'react-native-gifted-chat';
//import firebase from 'firebase';
class ViewGroup extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: navigation.state.params.groupDetail.Name
    });
    onPress = (group) => {
        this.props.navigation.navigate('groupchat', { group });
    }
    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>{this.props.navigation.state.params.groupDetail.Name}</Text>
                <Text>{this.props.navigation.state.params.groupDetail.Des}</Text>
                <TouchableOpacity onPress={this.onPress.bind(this, this.props.navigation.state.params.groupDetail)}
                    style={{
                        marginTop: 10,
                        padding: 10,
                        backgroundColor: '#3b5998',
                        borderRadius: 5,
                    }}
                >
                    <Text style={{ color: '#fff' }}>Join {this.props.navigation.state.params.groupDetail.Name}</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

export default ViewGroup;