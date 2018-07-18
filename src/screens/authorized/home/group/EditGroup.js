import React, { Component } from 'react'
import {
    StyleSheet,
    View,
    Text,
    EditView,
    Image
} from 'react-native';
class EditGroup extends Component {
    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Edit Contact</Text>
            </View>
        )
    }
}

export default EditGroup;