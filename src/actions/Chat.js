import {
    FETCH_ROOM_SUCCESS,
    FETCH_ROOM_ERROR,
    REGISTER_ROOM,
    FECTH_MESSSAGE_SUCCESS,
    FECTH_MESSSAGE_ERROR
} from './types';
const firebase = require("firebase");
const rmKey = null;
export const findRoomByUser = (me, friend) => {
    
    const db = firebase.database();
    return (dispatch) => {
        let roomKey = null;
        /**
         * find all rooms belong to me
         */
        db.ref(`users/${me.uid}/rooms`).on('value', rooms => {
            /**
             * if i have no room yet
             * stop all stuff
             */
            

            if (rooms.val() === null) {
                dispatch({
                    type: FETCH_ROOM_ERROR
                });
                return;
            }

            /**
             * loop all rooms
             */

            rooms.forEach(room => {
                /**
                 * if this room belong friend too
                 * => found room
                 */
                db.ref(`users/${friend.uid}/rooms/${room.key}`).on('value', snap => {
                    if (snap.val()) {
                        console.log('FOUND ROOM', room.key);
                        roomKey = room.key;
                        
                    }
                });
                if (roomKey != null) {
                    return;
                }
            });
            /**
             * if room belong to us
             * dispatch fetch room ok
             * do fetch message
             */
            rmKey = roomKey;
            //console.log('key',rmKey);
            if (roomKey != null) {
                dispatch({
                    type: FETCH_ROOM_SUCCESS,
                    roomKey
                });
                /**
                 * fetch message by room
                 */
                fetchMessagesByRoom(dispatch, roomKey, db);

            } else {
                dispatch({
                    type: FETCH_ROOM_ERROR
                })
            }
        }, error => {
            console.log('findRoomByUserError', error);
        });
    };
};


const fetchMessagesByRoom = (dispatch, roomKey, db) => {
    //console.log('msg', rmKey);
    db.ref(`messages/${rmKey}`).on('value', snap => {
        const messages = [];
        snap.forEach(message => {
            const msg = message.val();
            messages.push({
                _id: message.key,
                text: msg.text,
                user: msg.user,
                createdAt: msg.createdAt
            });
        });
        /**
         * sort messages
         */

        messages.sort((a, b) => {
            return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        });
        console.log(messages);
        dispatch({
            type: FECTH_MESSSAGE_SUCCESS,
            messages
        });
    }, error => {
        console.log('fetchMessagesByRoomERROR', error);
    });
};

export const sendMessage = (me, friend, text, roomKey) => {
    const firebase = require("firebase");
    const db = firebase.database(); 
    //console.log('ROOMKEY', roomKey);
    return (dispatch) => {
        /**
         * if we don't have any room
         * register new one
         */
        if (rmKey === null) {
            rmKey = registerRoom(dispatch, me, friend, db);
        }

        const now = firebase.database.ServerValue.TIMESTAMP;
        /**
         * push message
         */
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

const registerRoom = (dispatch, me, friend, db) => {
    const roomKey = db.ref(`rooms`).push().key;
    const update = {};
    /**
     * update room
     */
    update[`rooms/${roomKey}/${me.uid}`] = true;
    update[`rooms/${roomKey}/${friend.uid}`] = true;

    /**
     * update user
     */
    update[`users/${me.uid}/rooms/${roomKey}`] = true;
    update[`users/${friend.uid}/rooms/${roomKey}`] = true;

    //console.log('yo');
    db.ref().update(update).catch(error => console.log('registerRoomError', error));
    dispatch({
        type: REGISTER_ROOM,
        roomKey
    });
    return roomKey;
};