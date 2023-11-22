import { ERROR, LOADING, LOGINSUCCESS, REGISTERSUCCESS } from "../actionType";

const init = {
    loading: false,
    error: "",
    isAuth: false,
    user: {},
    role: "",
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
                isAuth: true,
                user: payload,
                role: payload.role
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