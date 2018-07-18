import React from 'react';
import { TouchableOpacity, Image } from 'react-native';

const DrawerButton = () => {
    return(
        <TouchableOpacity onPress={()=>  console.log('onPress')}>
            <Image source={require('../img/icons/menu.png')} style={{ width:32, height:32 }}/>
        </TouchableOpacity>
    );
}

export default DrawerButton;