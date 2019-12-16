import { SET_LOGIN_PARAMS, SET_REGISTER_PARAMS } from "./types"

export const setLoginParamsSuccess = () => {
    return {
        type: SET_LOGIN_PARAMS
    }
}
export const setRegisterParamsSuccess = () => {
    return {
        type: SET_REGISTER_PARAMS
    }
}