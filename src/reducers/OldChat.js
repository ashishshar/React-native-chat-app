import {
    FECTH_OLD_CHAT_SUCCESS,
    FECTH_OLD_CHAT_ERROR,
} from '../actions/types';

const INITIAL = {
    loading: true,
    oldchats: [],
};

export default (state = INITIAL, action) => {
    switch (action.type) {
        case FECTH_OLD_CHAT_SUCCESS:
            return { ...state, loading: false, oldchats: action.oldchats };
        case FECTH_OLD_CHAT_ERROR:
            return { ...INITIAL, loading: false };
        default:
            return state;
    }
}