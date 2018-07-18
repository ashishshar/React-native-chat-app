import { DrawerNavigator } from 'react-navigation';
import Home from './Home';
//import Profile from '../screens/authorized/profile';
import DrawerContent from '../components/DrawerContent';
const Authorized = DrawerNavigator({
    Home : {screen : Home},
    //Profile: { screen:  Profile},
}
);

export default Authorized;