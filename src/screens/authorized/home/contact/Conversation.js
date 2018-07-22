import React, { Component } from 'react';
import {
    View,
    Text,
    ListView,
    Image,
    ActivityIndicator
} from 'react-native';
import { connect } from 'react-redux';
import { GiftedChat } from 'react-native-gifted-chat';
import { findRoomByUser, sendMessage } from '../../../../actions';
import firebase from 'firebase';

class Conversation extends Component {
    static navigationOptions = {
        //title: ({ state }) => state.params.friend.displayName,
        // tabBar: {
        //     visible: false
        // }
    }
    //const me = firebase.auth().currentUser;
    componentWillMount() {
        const { me } = this.props;
        const { friend } = this.props.navigation.state.params;
        this.props.findRoomByUser(me, friend);
        console.log('key', this.props);
    }

    onSend = (messages = []) => {
        //console.log('key', this.props);
        const { me, roomKey } = this.props;
        const { friend } = this.props.navigation.state.params;
       
        this.props.sendMessage(me, friend, messages[0].text, roomKey);
    }

    render() {
        if (this.props.loading) {
            return (
                <View style={styles.containerIndicator}>
                    <ActivityIndicator size="large" color="purple" animating />
                </View>
            );
        }
        return (
            <View style={styles.container}>
                <GiftedChat
                    messages={this.props.messages}
                    user={{
                        _id: this.props.me.uid
                    }}
                    onSend={this.onSend.bind(this)}
                />
            </View>
        );
    }
}

const styles = {
    containerIndicator: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    container: {
        flex: 1
    }
};

export default connect(state => ({
    me: firebase.auth().currentUser,
    loading: state.chat.loading,
    messages: state.chat.messages,
    roomKey: state.chat.roomKey
}), { findRoomByUser, sendMessage })(Conversation);