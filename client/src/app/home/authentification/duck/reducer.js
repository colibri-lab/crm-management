import { SET_LOGIN_PARAMS, SET_REGISTER_PARAMS } from "./types";

const initialState = {
    isAuth: false
};

const loginReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_LOGIN_PARAMS:
            return { ...state, isAuth: true }
        case SET_REGISTER_PARAMS:
            return { ...state, isAuth: true }
        default:
            return state
    }
}
export default loginReducer