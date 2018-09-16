import React, { Component } from 'react'
import {
    StyleSheet,
    View,
    Image,
} from 'react-native';
import { Container, Thumbnail, Content, Text } from 'native-base';
class ViewProfile extends Component {
    render() {
        const uri = "https://facebook.github.io/react-native/docs/assets/favicon.png";
        return (
            <Container>
                <Content>
                    <View style={styles.container}>
                        <Image source={{ uri: uri }} style={styles.profileImage} />
                    </View>
                </Content>
            </Container>

        )
    }
}
const styles= StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center',
        justifyContent:'center',
        paddingTop: 30,
        paddingBottom: 20,
    },  
    profileImage:{
        width:220,
        height:220
    }
});
export default ViewProfile;