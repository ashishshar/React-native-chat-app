import {
    FETCH_GROUP_ROOM_SUCCESS,
    FETCH_GROUP_ROOM_ERROR,
    REGISTER_ROOM_GROUP,
    FECTH_GROUP_MESSSAGE_SUCCESS,
    FECTH_GROUP_MESSSAGE_ERROR
} from '../actions/types';

const INITIAL = {
    loading: true,
    messages: [],
    roomKey: null
};

export default (state = INITIAL, action) => {
    switch (action.type) {
        case FETCH_GROUP_ROOM_SUCCESS:
            return { ...state, loading: false, roomKey: action.roomKey };
        case FETCH_GROUP_ROOM_ERROR:
            return { ...INITIAL, loading: false };
        case REGISTER_ROOM_GROUP:
            return { ...state, roomKey: action.roomKey };
        case FECTH_GROUP_MESSSAGE_SUCCESS:
            return { ...state, loading: false, messages: action.messages };
        case FECTH_GROUP_MESSSAGE_ERROR:
            return { ...INITIAL, loading: false };
        default:
            return state;
    }
}