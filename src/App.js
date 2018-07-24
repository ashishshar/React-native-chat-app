import React, { Component } from 'react';
import { Provider } from 'react-redux';
import Login from './screens/unauthorized/Login';
import store from './store';
import Home from './navigations/Home';
const firebase = require("firebase");
const firebaseConfig = {
  apiKey: "AIzaSyDx28-OWpArp_y8llth8Go5-E3lDLXe-js",
  authDomain: "portfoliopro-68771.firebaseapp.com",
  databaseURL: "https://portfoliopro-68771.firebaseio.com",
  projectId: "portfoliopro-68771",
  storageBucket: "portfoliopro-68771.appspot.com",
  messagingSenderId: "209957949377"
};
export default class App extends Component{
  state = {
    loggedIn: null
  };
  componentWillMount() {
    firebase.initializeApp(firebaseConfig);
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          loggedIn: true
        });
      } else {
        this.setState({
          loggedIn: false
        });
      }
    });
    //console.log(this.props);
  };
  renderInitial() {
    switch (this.state.loggedIn) {
      case true:
        return <Home />;
      case false:
        return <Login />;
      default:
        return <Login />;
    }
  };
  render() {
    return (
      <Provider store={store}>
        {this.renderInitial()}
      </Provider>
    );
  }
}


