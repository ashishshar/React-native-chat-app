import { FETCH_GROUP_SUCCESS, FETCH_GROUP_ERROR } from './types';
export const fetchListGroup = ({ }) => {
    const firebase = require("firebase");
    const me = firebase.auth().currentUser;
    return (dispatch) => {
        firebase.database().ref('rooms').on('value', snap => {
            const groups = [];
            snap.forEach(group => {
                const ct = group.val();
                if (ct.Name) {
                    groups.push({
                        gpId: group.key,
                        Name: ct.Name,
                        Des:ct.Des,
                        photoURL:ct.DisplayImage
                    });
                }
            });
            dispatch({
                type: FETCH_GROUP_SUCCESS,
                groups
            });
        }, error => {
            console.log('error', error);
            dispatch({
                type: FETCH_GROUP_ERROR
            });
        }
        );
    }
}