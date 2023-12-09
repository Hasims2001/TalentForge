import { ALL_JOBS_GETTED, APPLIED_JOB_APPLICATION, ERROR, GOT_AI_OUTPUT, JOB_APPLIED, LOADING, RESETMSG, RESET_JOBSEEKER, } from "../actionType";
const init = {
    loading: false,
    error: "",
    isAuth: false,
    user: {},
    jobs: [],
    applied : [],
    message: "",
    chatWithAI: [],
    recommendedJobs: []
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
        case RESETMSG:
            return {
                ...state,
                message: ""
            }
        case RESET_JOBSEEKER:
            return{
                ...state,
                loading: false,
                error : "",
                message: "",
                recommendedJobs: []
            }
        case ALL_JOBS_GETTED:
            return {
                ...state,
                loading: false,
                jobs: payload,
                message : "all jobs by title"
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
        case GOT_AI_OUTPUT:
            let obj = {
                ...state,
                loading: false,
                chatWithAI: [
                    ...state.chatWithAI,
                    payload.data
                ]
            }
            if(payload.message === "here is the some recommendation according to your skills:"){
                obj.recommendedJobs = payload.data.content
                obj.message = payload.message
            }
            return obj
        default:
            return state
    }
}