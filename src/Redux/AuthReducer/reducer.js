import Cookies from "js-cookie";
import { ACCOUNT_UPDATED, ERROR, LOADING, LOGINSUCCESS, REGISTERSUCCESS, RESET } from "../actionType";

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
        case RESET:
            return{
                ...state,
                error : "",
                loading: false,
                message: ""
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
        case ACCOUNT_UPDATED:
            return {
                    ...state,
                    loading: false,
                    user: payload,
                    message: "Account Updated!"
            }
        default:
            return state
    }
}