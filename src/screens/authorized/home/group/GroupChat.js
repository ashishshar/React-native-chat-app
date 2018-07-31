import React, { Component } from 'react'
import {
    StyleSheet,
    View,
    Text,
    ListView,
    Image,
    ActivityIndicator
} from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import firebase from 'firebase';
import { connect } from 'react-redux';
import { findRoomByUsers, sendMessages, } from '../../../../actions';
class GroupChat extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: navigation.state.params.group.Name
    });

    state = {
        messages: [],
    }
    componentWillMount() {
        const firebase = require("firebase");
        const { me } = this.props;
        const { group } = this.props.navigation.state.params;
        this.props.findRoomByUsers(me, group);
    }

    onSend = (messages = []) => {
        const { me, roomKey } = this.props;
        const { friend } = this.props.navigation.state.params;
        this.props.sendMessages(me, friend, messages[0].text, roomKey);
        this.setState(previousState => ({
            messages: GiftedChat.append(previousState.messages, messages),
        }))
    }
    render() {
        if (this.props.loading) {
            return (
                <View style={styles.containerIndicator}>
                    <ActivityIndicator size="large" color="purple" animating />
                </View>
            );
        }
        //console.log(this.state);
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

const mapStateToProps = (state) => {
    console.log('mapStateToProps', state);
    return {
        me: firebase.auth().currentUser,
        loading: state.groupchat.loading,
        messages: state.groupchat.messages,
        roomKey: state.groupchat.roomKey
    };
};

export default connect(mapStateToProps, { findRoomByUsers, sendMessages })(GroupChat);