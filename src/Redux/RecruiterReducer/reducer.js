import { ERROR, LOADING, JOB_POSTED } from "../actionType";

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
        case JOB_POSTED:
            return{
                ...state,
                loading: false,
                message:"Job posted successfully!",
                jobposted: [
                    ...state.jobposted,
                    payload
                ]
            }
        default:
            return state
    }
}