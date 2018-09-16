import React, { Component} from 'react';
import {
    View,
    Text,
    Image,
    ListView,
    ActivityIndicator,
    TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';
import { fetchListGroup } from '../../../../actions';
import { Container, Left, Right, Icon, Body, Item, Input, Content, ListItem, Thumbnail, List, Button } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
class ListGroup extends Component{
    static navigationOptions = {
        header: null,
    };
    componentWillMount(){
       
        this.props.fetchListGroup(this.props);
        this.createDataSource(this.props);
    }

    componentWillReceiveProps(nextProps){
       
        this.createDataSource(nextProps);
    }

    createDataSource({groups}){
        const ds = new ListView.DataSource({
            rowHasChanged:(r1, r2) => r1!==r2
        });
        this.dataSource = ds.cloneWithRows(groups);
    }

    onRowPressed = (groupDetail) =>{
        this.props.navigation.navigate('viewgroup', { groupDetail });
    }

    renderRow = ( item ) => {
        return(
            <ListItem onPress={this.onRowPressed.bind(this, item)}>
                <Grid style={{marginBottom:1}}>
                    <Col size={20}>
                        <Thumbnail small source={{ uri: item.photoURL }} />
                    </Col>
                    <Col size={75}>
                        <Text style={{fontSize:18,}}>{item.Name}</Text>
                        <Text style={{ fontSize: 14, }}>Testing Data </Text>
                    </Col>
                    <Col size={5}>
                        <Icon small name="arrow-forward" />
                    </Col>
                </Grid>
            </ListItem>
        );
    }
    render(){
        if(this.props.loading){
            return(
                <View style={styles.containerIndecator}>
                    <ActivityIndicator size="large" color="red" animating/>
                </View>
            )
        }
        return(
            <Container style={{ backgroundColor: '#fff' }}>
                <Content style={{ paddingLeft: 10, paddingRight: 10, paddingTop: 40, paddingBottom: 0, height: 10, }}>
                    <Grid style={{ paddingLeft: 10, paddingRight:10}}>
                        <Col size={80}>
                            <Item regular>
                                <Icon active name='search' />
                                <Input placeholder='Search for communities to join' style={{ height: 40, width: 250 }} />
                                <Icon active name='close' />
                            </Item>
                        </Col>
                        <Col size={20}>
                            <Button style={{ alignSelf: 'flex-end', justifyContent: 'flex-start' }} transparent>
                                <Text>Cancel</Text>
                            </Button>
                        </Col>
                    </Grid>
                    <Grid>
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
    console.log('mapStateToProps Group', state);
    return {
        groups: state.group.groups,
        loading: state.group.loading,
    };
};

export default connect(mapStateToProps, { fetchListGroup })(ListGroup);