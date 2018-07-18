// import React from 'react';
// //import PropTypes from 'prop-types';
// import { connect } from 'react-redux';
// import { createStackNavigator } from 'react-navigation';
// import {
//     reduxifyNavigator,
//     createReactNavigationReduxMiddleware,
// } from 'react-navigation-redux-helpers';

// import Authorized from './navigations/Authorized';

// import Login from './screens/unauthorized/';

// const middleware = createReactNavigationReduxMiddleware(
//     'root',
//     state => state.nav
// );

// const RootNavigator = createStackNavigator({
//     Unauthorized: { screen: Login },
//     Authorized: { screen: Authorized },
// },
//     {
//         headerMode: 'screen'
//     }
// );
// const AppWithNavigationState = reduxifyNavigator(RootNavigator, 'root');

// const mapStateToProps = state => ({
//     state: state.nav,
// });

// const AppNavigator = connect(mapStateToProps)(AppWithNavigationState);

// export default  AppNavigator;
