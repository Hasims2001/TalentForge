import { ACCOUNT_UPDATED, ERROR, LOADING, } from "../actionType";

const init = {
    loading: false,
    error: "",
    isAuth: false,
    user: {},
    jobs: [],
    applied : [],
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