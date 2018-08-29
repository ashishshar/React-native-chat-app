import {
    FETCH_OLD_ROOM_SUCCESS,
    FETCH_OLD_ROOM_ERROR,
    FECTH_OLD_MESSSAGE_SUCCESS,
    FECTH_OLD_MESSSAGE_ERROR
} from './types';
const firebase = require("firebase");
const rmKey = null;
export const findRoomByUserss = (me, friend) => {
    const db = firebase.database();
    return (dispatch) => {
        let roomKey = friend.roomKey;
        rmKey = roomKey;
        db.ref(`users/${me.uid}/rooms`).on('value', rooms => {
            if (rooms.val() === null) {
                dispatch({
                    type: FETCH_OLD_ROOM_ERROR
                });
                return;
            }
            if (roomKey != null) {
                dispatch({
                    type: FETCH_OLD_ROOM_SUCCESS,
                    roomKey
                });
                fetchMessagesByRoom(dispatch, roomKey, db);
            } else {
                dispatch({
                    type: FETCH_OLD_ROOM_ERROR
                })
            }
        }, error => {
            console.log('findRoomByUserssError', error);
        });
    };
};


const fetchMessagesByRoom = (dispatch, roomKey, db) => {
    db.ref(`messages/${roomKey}`).on('value', snap => {
        const msgs = [];
        snap.forEach(message => {
            const msg = message.val();
            msgs.push({
                _id: message.key,
                text: msg.text,
                user: msg.user,
                createdAt: msg.createdAt
            });
        });
        msgs.sort((a, b) => {
            return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        });
        //console.log(msgs);
        dispatch({
            type: FECTH_OLD_MESSSAGE_SUCCESS,
            msgs
        });
    }, error => {
        console.log('fetchMessagesByRoomERROR', error);
    });
};

export const sendMessagess = (me, friend, text, roomKey) => {
    console.log(friend);
    const firebase = require("firebase");
    const db = firebase.database();
    //console.log('ROOMKEY', roomKey);
    return (dispatch) => {
        const now = firebase.database.ServerValue.TIMESTAMP;
        db.ref(`messages/${rmKey}`).push({
            text,
            user: {
                _id: me.uid,
                name: me.displayName,
                avatar: me.photoURL
            },
            createdAt: now
        });
    };
};
