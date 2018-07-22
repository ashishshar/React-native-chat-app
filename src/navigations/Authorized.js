import { DrawerNavigator } from 'react-navigation';
import Home from './Home';
const Authorized = DrawerNavigator({
    Home : {screen : Home},
    //Profile: { screen:  Profile},
}
);

export default Authorized;