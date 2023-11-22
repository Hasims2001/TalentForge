import { ERROR, LOADING, LOGINSUCCESS, REGISTERSUCCESS } from "../actionType";

const init = {
    loading: false,
    error: "",
    jobposted: [],
    applications: [],
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
        
        default:
            return state
    }
}