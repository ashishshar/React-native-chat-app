//const firebase = require("firebase");
import { 
    FECTH_OLD_CHAT_SUCCESS,
    FECTH_OLD_CHAT_ERROR 
} from './types';
export const fetchListChat = ({ }) => {
    const firebase = require("firebase");
    const me = firebase.auth().currentUser;
    const db = firebase.database();
    return (dispatch) => {
        db.ref(`users/${me.uid}/rooms`).on('value', snap => {
            const oldchats = [];
            snap.forEach(oldchat => { 
                db.ref(`rooms/${oldchat.key}`).on('value', rooms => {
                        const ct = rooms.val();
                        //console.log('datacheck', ct);
                        if (ct.Name) {
                            oldchats.push({
                                gpId: rooms.key,
                                Name: ct.Name,
                                photoURL:ct.DisplayImage,
                                gp:true,
                                roomKey: rooms.key
                            });
                            // dispatch({
                            //     type: FECTH_OLD_CHAT_SUCCESS,
                            //     oldchats
                            // });
                        }else{
                            const friend = rooms.node_.children_.root_.left.key;
                            db.ref(`users/${friend}`).once('value').then(function (snapshot){
                                //console.log(snapshot.val());
                                const frnd = snapshot.val();
                                //console.log(frnd);
                                oldchats.push({
                                    gpId: friend,
                                    Name: frnd.displayName,
                                    photoURL: frnd.photoURL,
                                    gp: false,
                                    roomKey: rooms.key
                                });
                                dispatch({
                                    type: FECTH_OLD_CHAT_SUCCESS,
                                    oldchats
                                });
                            });                         
                        }
                    }, error => {
                        //console.log('error', error);
                        dispatch({
                            type: FECTH_OLD_CHAT_ERROR
                        });
                    }
                );
            });
            // console.log('im here');
            // dispatch({
            //     type: FECTH_OLD_CHAT_SUCCESS,
            //     oldchats
            // });
        }, error => {
                //console.log('error', error);
                dispatch({
                    type: FECTH_OLD_CHAT_ERROR
                });
            }
        );
    }
}