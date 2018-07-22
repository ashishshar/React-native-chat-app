import firebase from 'firebase';

import {
    FETCH_CONTACT_SUCCESS,
    FETCH_CONTACT_ERROR
} from './types';

export const fetchListContact = ({ }) =>{
    const me = firebase.auth().currentUser;
        return (dispatch) => {
        firebase.database().ref('users').on('value', snap =>{
            const contacts = [];
            snap.forEach(contact => {
                if(contact.key != me.uid){
                    const ct = contact.val();
                    contacts.push({
                        uid: contact.key,
                        displayName: ct.displayName,
                        email: ct.email,
                        photoURL: ct.photoURL
                    });
                }
                
            });

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