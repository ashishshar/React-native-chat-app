import React, { Component } from 'react'
import {
    StyleSheet,
    View,
    Text,
    ListView,
    Image
} from 'react-native';
class AddContact extends Component {
    static navigationOptions = {
        title: 'Add Contact'
    }
    render() {
        console.log(this.props);
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Add Contact</Text>
            </View>
        )
    }
}

export default AddContact;