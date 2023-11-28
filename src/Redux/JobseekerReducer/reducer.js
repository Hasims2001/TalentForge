import { ALL_JOBS_GETTED, APPLIED_JOB_APPLICATION, ERROR, JOB_APPLIED, LOADING, RESET_JOBSEEKER, } from "../actionType";
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
        case RESET_JOBSEEKER:
            return{
                ...state,
                loading: false,
                error : "",
                message: ""
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
        case APPLIED_JOB_APPLICATION:
            return{
                ...state,
                loading: false,
                applied: payload,
                message: "applications got successfully!"
            }
        default:
            return state
    }
}