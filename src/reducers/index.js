import { combineReducers } from 'redux';

import Auth from './Auth';
//import Navigation from './Navigation';
import Contact from './Contact';
import Chat from './Chat';
import OldChat from './OldChat';
import Group from './Group';
import GroupChat from './GroupChat';

export default combineReducers({
    authentication : Auth,
    //nav : Navigation,
    contact : Contact,
    chat : Chat,
    oldchat: OldChat,
    group: Group,
    groupchat: GroupChat
}); 