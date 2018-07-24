import {
    FETCH_GROUP_SUCCESS,
    FETCH_GROUP_ERROR,
} from '../actions/types';

const INITIAL = {
    loading: true,
    groups: [],
};

export default (state = INITIAL, action) => {
    switch (action.type) {
        case FETCH_GROUP_SUCCESS:
            return { ...state, loading: false, groups: action.groups };
        case FETCH_GROUP_ERROR:
            return { ...INITIAL, loading: false };
        default:
            return state;
    }
}