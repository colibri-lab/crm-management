import { loginization, registration } from "../../../../api"
import { setLoginParamsSuccess, setRegisterParamsSuccess } from "./actions"

export const setLoginParams = (userName, password) => async dispatch => {
    const responce = await loginization(userName, password)
    console.log(responce)
    if (responce.data === "Incorrect Username and/or Password!") {
        console.error(responce)
    } else {
        console.log(responce)
        dispatch(setLoginParamsSuccess())
    }
}
export const setRegisterParams = (payload) => async dispatch => {
    debugger
    const responce = await registration(payload)
    debugger
    console.log(responce)
    if (responce.data === "Incorrect Username and/or Password!") {
        console.error(responce)
    } else {
        console.log(responce)
        dispatch(setRegisterParamsSuccess())
    }
}