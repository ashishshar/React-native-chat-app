//const firebase = require("firebase");


//import firebase from 'firebase';
import {
    FETCH_GROUP_ROOM_SUCCESS,
    FETCH_GROUP_ROOM_ERROR,
    REGISTER_ROOM_GROUP,
    FECTH_GROUP_MESSSAGE_SUCCESS,
    FECTH_GROUP_MESSSAGE_ERROR
} from './types';

const grpId = null;
const firebase = require("firebase");
export const findRoomByUsers = (me, group) => {
    const firebase = require("firebase");
    //console.log(group);
    //console.log(me);
    //return;
    grpId = group.gpId;
    //rmKey = grpId;
    const db = firebase.database();
    return (dispatch) => {
        let roomKey = null;
        //console.log(roomKey);
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
                    type: FETCH_GROUP_ROOM_ERROR
                });
                return;
            }

            /**
             * loop all rooms
             */
            console.log(rooms);
            rooms.forEach(room => {
                console.log('hey rooms', grpId);
                if (room.key === grpId) {
                    console.log('FOUND ROOM', room.key);
                    roomKey = room.key;
                    rmKey = room.key;
                }
                if (roomKey != null) {
                    return;
                }
            });
            //console.log('key', roomKey);
            if (roomKey != null) {
                dispatch({
                    type: FETCH_GROUP_ROOM_SUCCESS,
                    roomKey
                });
                /**
                 * fetch message by room
                 */
                //console.log('yo yo');
                fetchMessagesByRooms(dispatch, roomKey, db);

            } else {
                dispatch({
                    type: FETCH_GROUP_ROOM_ERROR
                })
            }
        }, error => {
            console.log('findRoomByUserError', error);
        });
     };
};


const fetchMessagesByRooms = (dispatch, roomKey, db) => {
    console.log('msg', roomKey);
    db.ref(`messages/${roomKey}`).on('value', snap => {
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
        console.log(messages);
        messages.sort((a, b) => {
            return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        });
        console.log(messages);
        dispatch({
            type: FECTH_GROUP_MESSSAGE_SUCCESS,
            messages
        });
    }, error => {
        console.log('fetchMessagesByRoomERROR', error);
    });
};

export const sendMessages = (me, friend, text, roomKey) => {
    //console.log('send', grpId);
    const firebase = require("firebase");
    const db = firebase.database();
    //console.log('ROOMKEY', roomKey);
    return (dispatch) => {
        /**
         * if we don't have any room
         * register new one
         */
        if (roomKey === null) {
            roomKey = registerRoom(dispatch, me, grpId, db);
        }
        const now = firebase.database.ServerValue.TIMESTAMP;
        /**
         * push message
         */
        db.ref(`messages/${grpId}`).push({
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

const registerRoom = (dispatch, me, grpId, db) => {
    //console.log('hey there');
    const roomKey = grpId;//db.ref(`rooms`).push().key;
    //console.log('reg',roomKey);
    const update = {};
    /**
     * update room
     */
    update[`rooms/${roomKey}/${me.uid}`] = true;

    /**
     * update user
     */
    //console.log(me.uid);
    //console.log('key of room', roomKey);
    update[`users/${me.uid}/rooms/${roomKey}`] = true;

    //console.log(db);
    db.ref().update(update).catch(error => console.log('registerRoomError', error));
    dispatch({
        type: REGISTER_ROOM_GROUP,
        roomKey
    });
    return roomKey;
};