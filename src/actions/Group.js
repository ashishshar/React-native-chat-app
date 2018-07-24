import firebase from 'firebase';
import { FETCH_GROUP_SUCCESS, FETCH_GROUP_ERROR } from './types';
export const fetchListGroup = ({ }) => {
    const me = firebase.auth().currentUser;
    return (dispatch) => {
        firebase.database().ref('rooms').on('value', snap => {
            const groups = [];
            snap.forEach(group => {
                const ct = group.val();
                console.log(ct.Name);
                if (ct.Name) {
                    groups.push({
                        Name: ct.Name,
                        photoURL:ct.DisplayImage
                    });
                }
            });
            console.log(groups);
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