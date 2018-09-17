import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    ListView,
    ActivityIndicator,
} from 'react-native';
import { connect } from 'react-redux';
import { fetchListChat } from '../../../../actions';
import { Container, Left, Right, Icon, Body, Item, Input, Content, ListItem, Thumbnail } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
const me = '';
class ListChat extends Component {
    static navigationOptions = {
        header: null,
    };
    componentWillMount() {
        this.props.fetchListChat(this.props);
        this.createDataSource(this.props);
        const firebase = require("firebase");
        me = firebase.auth().currentUser;
    }

    componentWillReceiveProps(nextProps) {
        this.createDataSource(nextProps);
    }

    createDataSource({ oldchats }) {
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });
        this.dataSource = ds.cloneWithRows(oldchats);
    }
    //const me = firebase.auth().currentUser;
    onRowPressed = (friends) => {
        this.props.navigation.navigate('RecentChat', { friends });
    }

    onRowPressedSearch = () => {
        this.props.navigation.navigate('ListGroup');
    }
    showProfile = () =>{
        this.props.navigation.navigate('ViewProfile', { friends });
    }

    renderRow = (item) => {
        return (
            <ListItem icon onPress={this.onRowPressed.bind(this, item)} style={{ height: 75}}>
                <Grid>
                    <Col size={20} style={{ justifyContent: 'center', alignContent: 'flex-start', paddingBottom:10}}>
                        <Thumbnail source={{ uri: item.photoURL }}/>
                    </Col>
                    <Col size={75} style={{ borderBottomColor: '#ccc', borderBottomWidth: 1, justifyContent: 'center', alignContent: 'flex-start',}}>
                        <Text style={{ fontSize: 18,fontWeight:'600' }}>{item.Name}</Text>
                        <Text style={{ fontSize: 14, marginTop:7, marginBottom:7 }}>Testing Data </Text>
                    </Col>
                    <Col size={5} style={{ borderBottomColor: '#ccc', borderBottomWidth: 1, justifyContent: 'center', alignContent: 'flex-end' }}>
                        <Icon small name="arrow-forward" />
                    </Col>
                </Grid>
            </ListItem>
        );
    }
    render() {
        if (this.props.loading) {
            return (
                <View style={styles.containerIndecator}>
                    <ActivityIndicator size="large" color="red" animating />
                </View>
            )
        }
        return (
            <Container style={{backgroundColor:'#fff'}}>
                <Content style={{ paddingLeft: 5, paddingRight: 10, paddingTop: 20, paddingBottom:0,}}>
                    <Grid style={{ paddingLeft: 25, paddingRight: 25}}>
                        <Col size={70} style={{ height: 93,alignItems: 'flex-start', justifyContent:'center'   }}>
                            <Text style={{ fontSize: 26, fontWeight: '400' }}>Hi {me.displayName}</Text>
                        </Col>
                        <Col size={30} style={{ height: 93,alignItems: 'flex-end', justifyContent: 'center' }}>
                            <Image source={{uri : me.photoURL}} style={{ height: 40, width: 40, borderRadius: 20 }} />
                        </Col>
                    </Grid>
                    <Grid style={{ paddingLeft: 25, paddingRight: 25 }}>
                        <Col>
                            <Item regular onPress={this.onRowPressedSearch.bind(this)}>
                                <Icon active name='search' style={{color:'#ccc'}} />
                                <Input onFocus={this.onRowPressedSearch.bind(this)} placeholder='Search for communities to join' style={{ height: 35, shadowColor:'#ccc', shadowRadius:20 , borderColor:'#ccc' , color:'#ccc' }} />
                            </Item>
                        </Col>
                    </Grid>
                    <Grid style={{marginTop:20}}>
                        <Col>
                            <ListView
                                enableEmptySections
                                dataSource={this.dataSource}
                                renderRow={this.renderRow.bind(this)}
                            />
                        </Col>
                    </Grid>
                </Content>
                
            </Container>
        )
    }
}

const styles = {
    container: {
        flex: 1
    },
    containerIndecator: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff'
    },
}
const mapStateToProps = (state) => {
    console.log('mapStateToProps list', state);
    return {
        oldchats: state.oldchat.oldchats,
        loading: state.oldchat.loading,
    };
};

export default connect(mapStateToProps, { fetchListChat })(ListChat);