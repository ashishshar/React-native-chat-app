import React, { Component} from 'react'
import {
    StyleSheet,
    View,
    Text,
    Image
} from 'react-native';
class ListGroup extends Component{
    static navigationOptions = {
        title: 'Groups'
    };
    render(){
        return(
            <View style={{ flex:1, justifyContent:'center', alignItems:'center'}}>
                <Text>List Groups</Text>
            </View>
        )
    }
}

export default ListGroup;