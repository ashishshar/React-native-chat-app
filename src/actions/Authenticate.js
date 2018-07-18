import { LOGIN } from "./types";
import { NavigationActions } from "react-navigation";

export const loginSuccess = (user) => {
    return(dispatch) =>{
        dispatch({
            type: LOGIN,
            payload: user
        });
        const resetNavigator = NavigationActions.reset({
            index : 0,
            actions:[
                NavigationActions.navigate({ 
                    routeName: 'Authorized',
                    params: [
                        user : user,
                    ] 
                })
            ]
        });
        dispatch(resetNavigator);
    };
};