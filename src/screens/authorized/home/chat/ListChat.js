import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    ListView,
    ActivityIndicator,
    TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';
import { fetchListChat } from '../../../../actions';
class ListChat extends Component {
    static navigationOptions = {
        title: 'Chats'
    }
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
        if (friends.gp){
            const groups = [];
            groups.push({
                gpId: friends.gpId,
                Name: friends.Name,
                Des: friends.Des,
                photoURL: friends.photoURL
            });
            const group = groups[0];
            this.props.navigation.navigate('groupchat', { group });
        }else{
            const friendchat = [];
            friendchat.push({
                uid: friends.gpId,
                displayName: friends.Name,
                photoURL: friends.photoURL  
            });
            const friend = friendchat[0];
            this.props.navigation.navigate('Conversation', { friend });
        }
        
    }

    renderRow = (item) => {
        return (
            <TouchableOpacity onPress={this.onRowPressed.bind(this, item)} style={styles.row}>
                <Image source={{ uri: item.photoURL }} style={styles.avator} />
                <Text style={styles.name}>{item.Name}</Text>
            </TouchableOpacity>
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
            <View style={styles.container}>
                <ListView
                    enableEmptySections
                    dataSource={this.dataSource}
                    renderRow={this.renderRow.bind(this)}
                />
            </View>
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
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        height: 50,
        backgroundColor: '#ccc',
        borderBottomWidth: 1,
        borderBottomColor: 'black'
    },
    avator: {
        width: 50,
        height: 50,
        borderWidth: 1
    },
    name: {
        // fontSize: 18,
        paddingLeft: 15,
    }
}
const mapStateToProps = (state) => {
    //console.log('mapStateToProps list', state);
    return {
        oldchats: state.oldchat.oldchats,
        loading: state.oldchat.loading,
    };
};

export default connect(mapStateToProps, { fetchListChat })(ListChat);