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
import { Container, Left, Right, Icon, Body, Item, Input, Content, ListItem, Thumbnail, List, Button, Header, Title } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
const me = '';
class ViewProfile extends Component {
    static navigationOptions = {
        header: null,
    };
    componentWillMount(){
        const firebase = require("firebase");
        me = firebase.auth().currentUser;
        //console.log(me);
    }
    render() {
        return (
            <Container style={{ backgroundColor: '#fff' }}>
                <Grid style={{ position: 'absolute', marginTop: 25, zIndex:1 }}>
                    <Col size={20}>
                        <Button transparent>
                            <Icon name='arrow-back' style={{ color: 'white' }} />
                        </Button>
                    </Col>
                    <Col size={65}>

                    </Col>
                    <Col style={{ alignItems: 'flex-end' }} size={15}>
                        <Button transparent>
                            <Text style={{ color: 'white' }}>edit</Text>
                        </Button>
                    </Col>
                </Grid>
                <Content style={{}}>
                    <Image source={{ uri: me.photoURL}} style={{ height: 270 }} />
                    
                    <Grid style={{}}>
                        <Row size={20} style={{ backgroundColor: 'blue', height: 70, paddingLeft: 25, paddingRight: 25, justifyContent: 'center', paddingTop: 10 }}>
                            <Col size={65}>
                                <Text style={{ color: '#fff', fontSize: 24, fontWeight: '900' }}>
                                    {me.displayName}{/* {this.props.navigation.state.params.groupDetail.Name} */}
                                </Text>
                                <Text style={{ color: '#fff', fontSize: 16, }}>
                                    AVP @ ZipLoan
                            </Text>
                            </Col>
                            <Col size={35}>
                                <Button transparent>
                                    <Icon name='ios-chatboxes' style={{ color: 'white', width:50 }} />
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
                            <Col>
                                <Text style={{ fontSize: 28, fontWeight: '600' }}>About</Text>
                                <Text style={{ fontSize: 12, fontWeight: '400', marginTop:15 }}>Educational Background</Text>
                                <Text style={{ fontSize: 12, paddingTop: 5, marginTop: 5, color:'#D8D8D8'}}>IIT Roorkee | 2008-2012</Text>
                                <Text style={{ fontSize: 12, fontWeight: '400', marginTop:15 }}>Employment History</Text>
                                <Text style={{ fontSize: 12, paddingTop: 5, marginTop: 5, color:'#D8D8D8' }}>Founder, Shoppify | 2015-2017</Text>
                                <Text style={{ fontSize: 12, paddingTop: 5, marginTop: 5, color:'#D8D8D8' }}>Consultant, Beatroute | 2016-2017</Text>
                            </Col>
                        </Row>
                        <Row size={40} style={{ marginLeft: 25, marginRight: 25, justifyContent: 'center', paddingTop: 5, borderBottomColor: '#ccc', borderBottomWidth: 1, paddingBottom: 10 }}>
                            <Col size={50}>
                                <Text style={{ fontSize: 14, fontWeight: '600' }}>Interested in</Text>
                            </Col>
                            <Col size={50} style={{ flex: 1, flexDirection: 'column' }}>
                                <Image source={require('../../../../img/profile.jpg')} style={{ height: 30, width: 30, borderRadius: 25, flex: 1, flexDirection: 'column' }} />
                                <Image source={require('../../../../img/profile.jpg')} style={{ height: 30, width: 30, borderRadius: 25, flex: 1, flexDirection: 'column' }} />
                                <Image source={require('../../../../img/profile.jpg')} style={{ height: 30, width: 30, borderRadius: 25, flex: 1, flexDirection: 'column' }} />
                            </Col>
                        </Row>
                        <Row size={40} style={{ marginLeft: 25, marginRight: 25, justifyContent: 'center', paddingTop: 5, borderBottomColor: '#ccc', borderBottomWidth: 1, paddingBottom: 10 }}>
                            <Col size={50}>
                                <Text style={{ fontSize: 14, fontWeight: '600' }}>My Groups</Text>
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
const styles= StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center',
        justifyContent:'center',
        paddingTop: 30,
        paddingBottom: 20,
    },  
    profileImage:{
        width:220,
        height:220
    }
});
export default ViewProfile;