import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    ListView,
    Image
} from 'react-native';

export default class ListChat extends Component {
    static navigationOptions = {
        title: 'Chat'
    };
    state = {
        friends: [
            {
                name: "Person Name 1",
                age: 27,
                avator: 'https://cdn.pixabay.com/photo/2013/07/13/13/38/man-161282_960_720.png'
            },
            {
                name: "Person Name 2",
                age: 27,
                avator: 'https://cdn.pixabay.com/photo/2013/07/13/13/38/man-161282_960_720.png'
            },
            {
                name: "Person Name 3",
                age: 27,
                avator: 'https://cdn.pixabay.com/photo/2013/07/13/13/38/man-161282_960_720.png'
            },
            {
                name: "Person Name 4",
                age: 27,
                avator: 'https://cdn.pixabay.com/photo/2013/07/13/13/38/man-161282_960_720.png'
            },
            {
                name: "Person Name 5",
                age: 27,
                avator: 'https://cdn.pixabay.com/photo/2013/07/13/13/38/man-161282_960_720.png'
            },
            {
                name: "Person Name 6",
                age: 27,
                avator: 'https://cdn.pixabay.com/photo/2013/07/13/13/38/man-161282_960_720.png'
            },
            {
                name: "Person Name 7",
                age: 27,
                avator: 'https://cdn.pixabay.com/photo/2013/07/13/13/38/man-161282_960_720.png'
            },
            {
                name: "Person Name 8",
                age: 27,
                avator: 'https://cdn.pixabay.com/photo/2013/07/13/13/38/man-161282_960_720.png'
            },
            {
                name: "Person Name 9",
                age: 27,
                avator: 'https://cdn.pixabay.com/photo/2013/07/13/13/38/man-161282_960_720.png'
            },
            {
                name: "Person Name 10",
                age: 27,
                avator: 'https://cdn.pixabay.com/photo/2013/07/13/13/38/man-161282_960_720.png'
            },
            {
                name: "Person Name 11",
                age: 27,
                avator: 'https://cdn.pixabay.com/photo/2013/07/13/13/38/man-161282_960_720.png'
            }
        ]
    };
    componentWillMount() {
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });
        this.dataSource = ds.cloneWithRows(this.state.friends);
    }
    renderRow = (item) => {
        return (
            <View style={styles.itemContainer}>
                <Image source={{ uri: item.avator }} style={styles.itemAvator} />
                <Text style={styles.itemName}>
                    {item.name}
                </Text>
            </View>
        );
    }
    renderSeparator = (sectionID, rowID) => {
        return <View key={`${sectionID}- ${rowID}`} style={styles.seperator} />;
    }

    render() {
        return (
            <View style={styles.container}>
                <ListView
                    enableEmptySections
                    dataSource={this.dataSource}
                    renderRow={this.renderRow}
                    renderSeparator={this.renderSeparator}
                />
            </View>
        );
    }
}

const styles = {
    container: {
        flex: 1,
    },
    itemContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        height: 60,
    },
    itemAvator: {
        width: 60,
        height: 60,
    },
    itemName: {
        paddingLeft: 15,
        //fontSize: 16,
        color: '#444'
    },
    seperator: {
        borderBottomWidth: 1,
        borderBottomColor: '#444',
    }

}