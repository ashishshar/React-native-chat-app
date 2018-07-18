import React, {Component} from 'react';
import { View, Image, Text} from 'react-native';
import { connect } from 'react-redux';
import { DrawerView } from 'react-navigation'
class DrawerContent extends Component{
    render(){
        const { container, profile, avator } = styles;
        const {user} = this.props;
        return(
            <View style={container}>
                <View style={profile}>
                    <Image source={{ uri : user.photoURL}} style={avator}/>
                </View>
                <DrawerView.Items {...this.props} />
            </View>
        );
    }
}

const style = {
    container:{
        flex:1
    },
    profile:{
        height:300,
        backgroundColor:'yello',
    },
    avator:{
        width:100,
        height:100,
        borderRadius: 50,
    }
}

export default connect(state =>({
    user:state.authentication.user
}))(DrawerContent);