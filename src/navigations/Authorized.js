import { DrawerNavigator } from 'react-navigation';
import Home from './Home';
const Authorized = DrawerNavigator({
    Home : {screen : Home},
}
);

export default Authorized;