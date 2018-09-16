import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    ActivityIndicator,
    Image
} from 'react-native';
import { connect } from 'react-redux';
import Swiper from 'react-native-swiper';
// Fachebook LOgin 
import { AccessToken, LoginManager } from 'react-native-fbsdk';
import { loginSuccess } from '../../actions/Authenticate';


class Login extends Component {
    static navigationOptions = {
        header :{
            visible: false
        }
    }
    state = {
        logged: false,
        animating: false,
        error:null
    }
    componentWillMount(){
        const firebase = require('firebase');
    }
    onLogin = async () => {
        try {
            this.setState({
                animating: true
            });
            const result = await LoginManager.logInWithReadPermissions(['public_profile', 'email']);
            if (result.isCancelled) {
                throw new Error('Please sign in before continue');
            }
            const tokenData = await AccessToken.getCurrentAccessToken();
            const token = tokenData.accessToken.toString();
            const credential = firebase.auth.FacebookAuthProvider.credential(token);
            const user = await firebase.auth().signInAndRetrieveDataWithCredential(credential);
            // firebase.database().ref(`/users/${user.uid}/profile`).set({
            //     name: user.displayName,
            //     email: user.email,
            //     avatar: user.photoURL
            // });
            this.props.loginSuccess(user);

            this.setState({
                animating: false
            });
        } catch (error) {
            this.setState({
                animating: false
            });
            console.log(error.message);
            // do something here
        }
    }
    render() {
        return (
            <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'white',}}>
                
                <Image source={require('../../img/logo.png')} style={styles.logoImg}/>
                <View>
                    <Text style={styles.titleText}>Be Social</Text>
                </View>
                <View style={styles.containerSwip}>
                    {/* <View style={styles.slide1}>
                        <Text style={styles.text}>Connect with likeminded people through communities</Text>
                    </View> */}
                    <Swiper style={styles.wrapper} width={300} height={120} autoplay loadMinimalSize={22} >
                        <View style={styles.slide1}>
                            <Text style={styles.text}>Connect with likeminded people through communities</Text>
                        </View>
                        <View style={styles.slide2}>
                            <Text style={styles.text}>Start your own community to build a network</Text>
                        </View>
                    </Swiper>
                </View>
                <View>
                    <Text style={styles.tapText}>By tapping "Log in", you are agree to our Terms and Privacy Policy,</Text>
                </View>
                <TouchableOpacity
                    onPress={this.onLogin}
                    style={{
                        marginTop: 0,
                        backgroundColor: '#FFF',
                    }}
                >
                    <Image source={require('../../img/loginBtn.png')} style={styles.loginImg}/>
                </TouchableOpacity>
                <View>
                    <Text style={styles.tapText}>We dont post anything to Facebook</Text>
                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    containerSwip:{
        borderBottomWidth: 1,
        borderColor: '#ccc',
        height:180,
        maxWidth:300
    },
    wrapper:{
    },
    logoImg:{
        marginTop: 30,
        width:125,
        height:125
    },
    titleText:{
        marginTop: 30,
        fontSize: 25,
        fontWeight:"bold"
    },
    slide1: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 30,
        height: 120
    },
    slide2: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 30,
        height: 120
    },
    text: {
        color: '#696969',
        fontSize: 16,
        paddingHorizontal: 10,
        lineHeight:30,
        textAlign:'center'
    },
    tapText:{
        marginHorizontal: 20,
        paddingHorizontal: 35,
        paddingVertical: 20,
        color:'#C0C0C0',
        fontSize: 12,
        textAlign:'center'
    }
})
const mapStateToProps = (state) => {
    //console.log('mapStateToProps', state);
    return {
        logged: state.authentication.loggedIn,
        user: state.authentication.user
    };
};
export default connect(mapStateToProps, { loginSuccess })(Login);