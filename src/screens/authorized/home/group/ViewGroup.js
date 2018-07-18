import React, { Component } from 'react'
import {
    StyleSheet,
    View,
    Text,
    ListView,
    Image
} from 'react-native';
class ViewGroup extends Component {
    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>View Contact</Text>
            </View>
        )
    }
}

export default ViewGroup;