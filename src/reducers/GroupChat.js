import {
    FETCH_ROOM_SUCCESS,
    FETCH_ROOM_ERROR,
    FECTH_MESSSAGE_SUCCESS,
    FETCH_MESSAGE_ERROR
} from '../actions/types';

const INITIAL = {
    loading: true,
    messages: [],
    roomKey: null
};

export default (state = INITIAL, action) => {
    switch (action.type) {
        case FETCH_ROOM_SUCCESS:
            return { ...state, loading: false, roomKey: action.roomKey };
        case FETCH_ROOM_ERROR:
            return { ...INITIAL, loading: false };
        case FECTH_MESSSAGE_SUCCESS:
            return { ...state, loading: false, messages: action.messages };
        case FETCH_MESSAGE_ERROR:
            return { ...INITIAL, loading: false };
        default:
            return state;
    }
}