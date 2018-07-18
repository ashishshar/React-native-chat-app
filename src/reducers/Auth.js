import { LOGIN } from "../actions/types";
const INITIAL = {
    loggedIn: false,
    user:null
};

export default (state = INITIAL, action) => {
    switch (action.type) {
        case LOGIN:
            return { loggedIn:true, user: action.payload };
        default:
            return state;
    }
}