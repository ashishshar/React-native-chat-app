import firebase from 'firebase';
import { 
    FECTH_OLD_CHAT_SUCCESS,
    FECTH_OLD_CHAT_ERROR 
} from './types';
export const fetchListChat = ({ }) => {
    const me = firebase.auth().currentUser;
    return (dispatch) => {
        firebase.database().ref('users').on('value', snap => {
            const oldchats = [];
            snap.forEach(oldchat => {
                if (oldchat.key != me.uid && oldchat.rooms == me.rooms) {
                    const ct = oldchat.val();
                    oldchats.push({
                        uid: oldchat.key,
                        displayName: ct.displayName,
                        email: ct.email,
                        photoURL: ct.photoURL,
                        rooms:ct.rooms
                    });
                }
            });
            console.log('oldchat',oldchats);
            dispatch({
                type: FECTH_OLD_CHAT_SUCCESS,
                oldchats
            });
        }, error => {
            console.log('error', error);
            dispatch({
                type: FECTH_OLD_CHAT_ERROR
            });
        }
        );
    }
}