import React, { Component } from 'react';
import {
    View,
    ActivityIndicator
} from 'react-native';
import { connect } from 'react-redux';
import { GiftedChat } from 'react-native-gifted-chat';
import { findRoomByUserss, sendMessagess } from '../../../../actions';

import firebase from 'firebase';
class RecentChat extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: navigation.state.params.friends.Name
    })
    state = {
        messages: [],
    }
    componentWillMount() {
        //console.log(this.props.navigation.state.params);
        const firebase = require("firebase");
        const { me } = this.props;
        const { friends } = this.props.navigation.state.params;
        this.props.findRoomByUserss(me, friends);
        //console.log(this.props.navigation.state.params);
    }
    onSend = (msgs = []) => {
        const { me, roomKey } = this.props;
        const { friend } = this.props.navigation.state.params;
        console.log(friend);
        this.props.sendMessagess(me, friend, msgs[0].text, roomKey);
        this.setState(previousState => ({
            messages: GiftedChat.append(previousState.msgs, msgs),
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
                    messages={this.props.msgs}
                    user={{
                        _id: this.props.me.uid
                    }}
                    onSend={this.onSend.bind(this)}
                    parsePatterns={linkStyle => [
                        {
                            pattern: /#(\w+)/,
                            style: { ...linkStyle, color: 'lightgreen' },
                            onPress: props => alert(`press on ${props}`),
                        },
                    ]}
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
    //console.log('mapStateToProps', state);
    return {
        me: firebase.auth().currentUser,
        loading: state.recentchat.loading,
        msgs: state.recentchat.msgs,
        roomKey: state.recentchat.roomKey
    };
};

export default connect(mapStateToProps, { findRoomByUserss, sendMessagess })(RecentChat);