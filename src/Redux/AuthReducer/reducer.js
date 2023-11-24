import Cookies from "js-cookie";
import { ERROR, LOADING, LOGINSUCCESS, REGISTERSUCCESS } from "../actionType";

const init = {
    loading: false,
    error: "",
    user:JSON.parse(Cookies.get('user') || null) || {},
    token: Cookies.get('userToken') || "",
    role: Cookies.get('userRole') || "",
    message: ""
}
export const reducer = (state=init, {type, payload})=>{
    switch(type){
        case LOADING:
            return {
                ...state,
                loading: true
            }
        case ERROR:
            return {
                ...state,
                loading: false,
                error: payload
            }
        case LOGINSUCCESS:
            return {
                ...state,
                loading: false,
                user: payload,
                role: payload.role,
                token: payload.token
            }
        case REGISTERSUCCESS:
            return {
                ...state,
                loading: false,
                message: payload
            }
        default:
            return state
    }
}