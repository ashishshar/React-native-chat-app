import React, { Component } from 'react'
import {
    StyleSheet,
    View,
    Text,
    ListView,
    TouchableOpacity,
    Image,
    ImageBackground,
    Alert
} from 'react-native';
import { Container, Left, Right, Icon, Body, Item, Input, Content, ListItem, Thumbnail, List, Button, Header, Title} from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import HeaderImageScrollView, { TriggeringView } from 'react-native-image-header-scroll-view';
//import { GiftedChat } from 'react-native-gifted-chat';
//import firebase from 'firebase';
class ViewGroup extends Component {
    static navigationOptions = {
        header: null,
    };
    // static navigationOptions = ({ navigation }) => ({
    //     title: navigation.state.params.groupDetail.Name
    // });
    onPress = (group) => {
        Alert.alert(
            'Confirmation',
            `Do you want to be part of this group `,
            [
                { text: 'Cancel', style: 'cancel' },
                { text: 'OK', onPress: () => {this.props.navigation.navigate('groupchat', { group })} },
            ],
            { cancelable: true }
        )
        //this.props.navigation.navigate('groupchat', { group });
    }
    render() {
        return (
            <Container style={{ backgroundColor: '#fff' }}>
                <Content style={{}}>
                    <Image source={require('../../../../img/groupback.jpg')} style={{ height: 270 }} />
                    <Grid style={{}}>
                        <Row size={20} style={{ backgroundColor: 'blue', height: 70, paddingLeft: 25, paddingRight: 25, justifyContent: 'center', paddingTop: 10 }}>
                            <Col size={65}>
                                <Text style={{ color: '#fff', fontSize: 24, fontWeight: '900' }}>
                                    {this.props.navigation.state.params.groupDetail.Name}
                                </Text>
                                <Text style={{ color: '#fff', fontSize: 16, }}>
                                    New Delhi
                            </Text>
                            </Col>
                            <Col size={35}>
                                <Button transparent onPress={this.onPress.bind(this, this.props.navigation.state.params.groupDetail)}>
                                    <Text style={{ color: '#fff', fontSize: 18 }}>Join Group</Text>
                                </Button>
                            </Col>
                            {/* <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
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
                                <Text style={{ color: '#fff' }}>Join </Text>
                            </TouchableOpacity>
                        </View> */}
                        </Row>
                        <Row size={40} style={{ marginLeft: 25, marginRight: 25, justifyContent: 'center', paddingTop: 20, borderBottomColor: '#ccc', borderBottomWidth: 1, paddingBottom: 10 }}>
                            <Col size={90}>
                                <Text style={{ fontSize: 28, fontWeight: '600' }}>About</Text>
                                <Text style={{ fontSize: 12, paddingTop: 5 }}>{this.props.navigation.state.params.groupDetail.Des}</Text>
                            </Col>
                            <Col size={10}>
                                <Icon name='lock' small style={{ color: 'green' }} />
                            </Col>
                        </Row>
                        <Row size={40} style={{ marginLeft: 25, marginRight: 25, justifyContent: 'center', paddingTop: 5, borderBottomColor: '#ccc', borderBottomWidth: 1, paddingBottom: 10 }}>
                            <Col size={50}>
                                <Text style={{ fontSize: 14, fontWeight: '600' }}>Group Members</Text>
                                <Text style={{ fontSize: 14, paddingTop: 5 }}>200</Text>

                            </Col>
                            <Col size={50} style={{ flex: 1, flexDirection: 'column' }}>
                                <Image source={require('../../../../img/profile.jpg')} style={{ height: 30, width: 30, borderRadius: 25, flex: 1, flexDirection: 'column' }} />
                                <Image source={require('../../../../img/profile.jpg')} style={{ height: 30, width: 30, borderRadius: 25, flex: 1, flexDirection: 'column' }} />
                                <Image source={require('../../../../img/profile.jpg')} style={{ height: 30, width: 30, borderRadius: 25, flex: 1, flexDirection: 'column' }} />
                            </Col>
                        </Row>
                        <Row size={40} style={{ marginLeft: 25, marginRight: 25, justifyContent: 'center', paddingTop: 5, borderBottomColor: '#ccc', borderBottomWidth: 1, paddingBottom: 10 }}>
                            <Col size={50}>
                                <Text style={{ fontSize: 14, fontWeight: '600' }}>Similar Groups</Text>
                            </Col>
                            <Col size={50} style={{ flex: 1, flexDirection: 'column' }}>
                                <Image source={require('../../../../img/profile.jpg')} style={{ height: 30, width: 30, borderRadius: 25 }} />
                                <Image source={require('../../../../img/profile.jpg')} style={{ height: 30, width: 30, borderRadius: 25 }} />
                                <Image source={require('../../../../img/profile.jpg')} style={{ height: 30, width: 30, borderRadius: 25 }} />
                            </Col>
                        </Row>
                    </Grid>
                </Content>
            </Container>


            
        )
    }
}

export default ViewGroup;