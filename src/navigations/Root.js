import { createStackNavigator } from 'react-navigation';
//import Authorized from './Authorized';

import Login from '../screens/unauthorized/Login';
import Home from './Home';


const Root = createStackNavigator({
    Unauthorized : { screen : Login},
    Authorized : { screen: Home },
},
{
    headerMode:'screen',
    navigationOptions:
    {
        visible:false
    }
}
);

export default Root;
