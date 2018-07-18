import firebase from 'firebase';

import {
    FETCH_CONTACT_SUCCESS,
    FETCH_CONTACT_ERROR
} from './types';

export const fetchListContact = ({ me }) =>{
    return (dispatch) => {
        /**
         * on: check network => compare local => aync
         * once: connect db and fetch once, read persisted data (on phone)
         * value, chlid_added, changed etc.....
         * JSON tree
         * Object
         *  Object
         *  Object etc...
         */
        firebase.database().ref('users')
        .on('value', snap =>{
            const contacts = [];
            snap.forEach(contact => {
                if(contact.key != me.uid){
                    contacts.push(contact.val());
                }
                
            });
            console.log('contacts',contacts);

            dispatch({
                type: FETCH_CONTACT_SUCCESS,
                contacts
            });
        },error => {
            console.log('error', error);
            dispatch({
                type:FETCH_CONTACT_ERROR
            });
        }
    );
    }
}