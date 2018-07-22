import {
    FETCH_ROOM_SUCCESS,
    FETCH_ROOM_ERROR,
    REGISTER_ROOM,
    FETCH_MESSAGE_SUCCESS,
    FETCH_MESSAGE_ERROR
} from '../actions/types';

const INITIAL = {
    loading: true,
    messages: [],
    roomKey: null
};

export default (state = INITIAL, action) =>{
    switch (action.type){
        case FETCH_ROOM_SUCCESS:
            return { ...state, loading:false,roomkey:action.roomKey};
        case FETCH_ROOM_ERROR:
            return {...INITIAL, loading:false};
        case REGISTER_ROOM:
            return { ...state, roomKey: action.roomKey };
        case FETCH_MESSAGE_SUCCESS:
            return {...state, loading:false, messages:action.messages};
        case FETCH_MESSAGE_ERROR:
            return { ...INITIAL, loading: false};
        default:
            return state;
    }
}