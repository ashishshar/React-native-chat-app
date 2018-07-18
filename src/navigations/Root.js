import { createStackNavigator } from 'react-navigation';
import Authorized from './Authorized';

import Login from '../screens/unauthorized/Login';


const Root = createStackNavigator({
    Unauthorized : { screen : Login},
    Authorized : { screen: Authorized },
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
