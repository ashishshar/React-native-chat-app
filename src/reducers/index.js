import { combineReducers } from 'redux';

import Auth from './Auth';
import Contact from './Contact';
import Chat from './Chat';
import OldChat from './OldChat';
import RecentChat from './RecentChat';
import Group from './Group';
import GroupChat from './GroupChat';

export default combineReducers({
    authentication : Auth,
    contact : Contact,
    chat : Chat,
    oldchat: OldChat,
    recentchat: RecentChat,
    group: Group,
    groupchat: GroupChat
}); 