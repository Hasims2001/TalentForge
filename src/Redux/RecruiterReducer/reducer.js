import { ERROR, LOADING, JOB_POSTED, JOB_GETTED, JOB_DELETED, JOB_UPDATED, RESET } from "../actionType";

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
        case RESET:
            return{
                ...state,
                error : "",
                loading: false,
                message: ""
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
        case JOB_GETTED:
            return{
                ...state,
                loading:false,
                jobposted: payload
            }
        case JOB_UPDATED:
            let update = state.jobposted.map((item)=>{
                if(item.id === payload.id){
                    return payload
                }else{
                    return item
                }
            })
            return {
                ...state,
                loading: false,
                jobposted: update,
                "message": "Job post updated successfully!"
            }
        case JOB_DELETED:
            let filterd = state.jobposted.filter((item)=> item.id !== payload)
            return {
                ...state,
                loading: false,
                jobposted: filterd,
                "message": "Job post deleted successfully!"
            }
        default:
            return state
    }
}