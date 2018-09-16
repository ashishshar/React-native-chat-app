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
class ListChat extends Component {
    static navigationOptions = {
        header: null,
    };
    componentWillMount() {
        this.props.fetchListChat(this.props);
        this.createDataSource(this.props);
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

    onRowPressed = (friends) => {
        this.props.navigation.navigate('RecentChat', { friends });
    }

    onRowPressedSearch = () => {
        this.props.navigation.navigate('List');
    }

    renderRow = (item) => {
        return (
            <ListItem icon onPress={this.onRowPressed.bind(this, item)}>
                <Grid style={{ marginBottom: 1 }}>
                    <Col size={20}>
                        <Thumbnail small source={{ uri: item.photoURL }} />
                    </Col>
                    <Col size={75}>
                        <Text style={{ fontSize: 18, }}>{item.Name}</Text>
                        <Text style={{ fontSize: 14, }}>Testing Data </Text>
                    </Col>
                    <Col size={5}>
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
                <Content style={{ paddingLeft: 18, paddingRight: 18, paddingTop: 20, paddingBottom:0, height:10,}}>
                    <Grid>
                        <Col style={{ height: 93, flex: 1, alignItems: 'flex-start', justifyContent:'center'   }}>
                            <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Hello Divij</Text>
                        </Col>
                        <Col style={{ height: 93, flex: 1, alignItems: 'flex-end', justifyContent: 'center' }}>
                            <Image source={require('../../../../img/profile.jpg')} style={{ height: 50, width: 50, borderRadius: 25 }} />
                        </Col>
                    </Grid>
                    <Grid>
                        <Col>
                            <Item regular onPress={this.onRowPressedSearch.bind(this)}>
                                <Icon active name='search' />
                                <Input placeholder='Search for communities to join' style={{ height: 40 }} onPress={this.onRowPressedSearch.bind(this)} />
                            </Item>
                        </Col>
                    </Grid>
                    <Grid style={{marginTop:10}}>
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
    row: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        height: 45,
        borderBottomWidth: 1,
        borderBottomColor: "#CCC",
    },
    avator: {
        width: 40,
        height: 40,
        borderRadius: 20,
    },
    name: {
        // fontSize: 18,
        paddingLeft: 15,
    }
}
const mapStateToProps = (state) => {
    console.log('mapStateToProps list', state);
    return {
        oldchats: state.oldchat.oldchats,
        loading: state.oldchat.loading,
    };
};

export default connect(mapStateToProps, { fetchListChat })(ListChat);