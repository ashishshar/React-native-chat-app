import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    ActivityIndicator
} from 'react-native';
import { connect } from 'react-redux';

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
                backgroundColor: '#F5FCFF',}}>
                <Text>Login Screen</Text>
                <ActivityIndicator
                    animating={this.state.animating}
                    color="#ddd"
                    size="large"
                />
                <TouchableOpacity
                    onPress={this.onLogin}
                    style={{
                        marginTop: 10,
                        padding: 10,
                        backgroundColor: '#3b5998',
                        borderRadius: 5,
                    }}
                >
                    <Text style={{ color: '#fff' }}>
                        Login With Facebook
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    //console.log('mapStateToProps', state);
    return {
        logged: state.authentication.loggedIn,
        user: state.authentication.user
    };
};
export default connect(mapStateToProps, { loginSuccess })(Login);