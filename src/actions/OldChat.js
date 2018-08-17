//const firebase = require("firebase");
import { 
    FECTH_OLD_CHAT_SUCCESS,
    FECTH_OLD_CHAT_ERROR 
} from './types';
export const fetchListChat = ({ }) => {
    const firebase = require("firebase");
    const me = firebase.auth().currentUser;
    return (dispatch) => {
        firebase.database().ref(`users/${me.uid}/rooms`).on('value', snap => {
            const oldchats = [];
            snap.forEach(oldchat => {
                firebase.database().ref(`rooms/${oldchat.key}`)
                    .on('value', rooms => {
                        const ct = rooms.val();
                        if (ct.Name) {
                            oldchats.push({
                                gpId: rooms.key,
                                Name: ct.Name,
                                photoURL:ct.DisplayImage
                            });
                        }else{
                            oldchats.push({
                                gpId: rooms.key,
                                Name: 'Test',
                                photoURL: 'testing image'
                            });
                            //firebase.database().ref(`users/${friend.uid}/rooms/${room.key}`).on('value', snap => {
                            //     if (snap.val()) {
                            //         console.log('FOUND ROOM', room.key);
                            //         roomKey = room.key;

                            //     }
                            // });
                            // if (roomKey != null) {
                            //     return;
                            // }
                        }
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