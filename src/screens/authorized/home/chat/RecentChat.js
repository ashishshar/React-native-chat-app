import React, { Component } from 'react';
import {
    View,
    ActivityIndicator
} from 'react-native';
import { connect } from 'react-redux';
import { GiftedChat } from 'react-native-gifted-chat';
import { findRoomByUserss, sendMessagess } from '../../../../actions';
import { Container, Left, Right, Icon, Body, Item, Input, Content, ListItem, Thumbnail, Header, Button, Title, Text, Subtitle } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';

import firebase from 'firebase';
class RecentChat extends Component {
    static navigationOptions = {
        header: null,
    };
    state = {
        messages: [],
    }
    componentWillMount() {
        //console.log(this.props.navigation.state.params);
        const firebase = require("firebase");
        const { me } = this.props;
        const { friends } = this.props.navigation.state.params;
        this.props.findRoomByUserss(me, friends);
        console.log(friends);
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
            <Container>
                <Header style={{height:80, paddingBottom:3}}>
                    <Left style={{ alignItems: 'flex-end' }}>
                        <Button transparent>
                            <Icon name='arrow-back' style={{marginRight: 10,}}/>
                            <Thumbnail style={{ marginLeft: 10,width:40, height:40, borderRadius:20 }} source={{ uri: this.props.navigation.state.params.friends.photoURL }} />
                        </Button>
                    </Left>
                    <Body style={{alignItems:'flex-start'}}>
                        <Title>{this.props.navigation.state.params.friends.Name}</Title>
                        <Subtitle>Online</Subtitle>
                    </Body>
                    <Right></Right>
                </Header>
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
            </Container>
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