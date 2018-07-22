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
import { findRoomByUser, sendMessage, } from '../../../../actions';
import firebase from 'firebase';
//const messages = [];
//const roomKey = null;
class Chat extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: navigation.state.params.friend.displayName
    })
    // tabBar: {
    //     visible: false
    // }
    //const me = firebase.auth().currentUser;

    state = {
        messages: [],
    }
    componentWillMount() {
        const { me } = this.props;
        const { friend } = this.props.navigation.state.params;
        this.props.findRoomByUser(me, friend);
    }


    onSend = (messages = []) => {
        const { me, roomKey } = this.props;
        const { friend } = this.props.navigation.state.params;
        this.props.sendMessage(me, friend, messages[0].text, roomKey);
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
        loading: state.chat.loading,
        messages: state.chat.messages,
        roomKey: state.chat.roomKey
    };
};

export default connect(mapStateToProps, { findRoomByUser, sendMessage })(Chat);