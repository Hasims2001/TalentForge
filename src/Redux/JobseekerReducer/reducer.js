import { ALL_JOBS_GETTED, ERROR, JOB_APPLIED, LOADING, } from "../actionType";
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
        case ALL_JOBS_GETTED:
            return {
                ...state,
                loading: false,
                jobs: payload
            }
        case JOB_APPLIED:
            let filtered = state.jobs.filter(item=> item.id !== payload.job_id)
            let filteredApplied = state.jobs.filter(item=> item.id === payload.job_id)
            return {
                ...state,
                loading: false,
                message: "applied successfully!",
                jobs: filtered,
                applied: [
                    ...state.applied,
                    filteredApplied
                ]
            }
        default:
            return state
    }
}