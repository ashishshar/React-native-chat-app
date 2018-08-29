import {
    FETCH_OLD_ROOM_SUCCESS,
    FETCH_OLD_ROOM_ERROR,
    FECTH_OLD_MESSSAGE_SUCCESS,
    FECTH_OLD_MESSSAGE_ERROR
} from '../actions/types';

const INITIAL = {
    loading: true,
    msgs: [],
    roomKey: null
};

export default (state = INITIAL, action) => {
    switch (action.type) {
        case FETCH_OLD_ROOM_SUCCESS:
            return { ...state, loading: false, roomKey: action.roomKey };
        case FETCH_OLD_ROOM_ERROR:
            return { ...INITIAL, loading: false };
        case FECTH_OLD_MESSSAGE_SUCCESS:
            return { ...state, loading: false, msgs: action.msgs };
        case FECTH_OLD_MESSSAGE_ERROR:
            return { ...INITIAL, loading: false };
        default:
            return state;
    }
}