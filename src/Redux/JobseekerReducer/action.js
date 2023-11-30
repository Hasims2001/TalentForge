import  axios  from "axios"
import { ALL_JOBS_GETTED, APPLIED_JOB_APPLICATION, ERROR, JOB_APPLIED, LOADING } from "../actionType"


export const getAllJobs= (token)=>async(dispatch)=>{
    dispatch({type: LOADING})
    try {
        let res = await axios.get(`${process.env.REACT_APP_JOB_POSTING}/all/jobs`,  {headers: {Authorization: token}})
        res = await res?.data
        if(!res.issue){
            dispatch({type: ALL_JOBS_GETTED, payload: res.data})
        }else{
            dispatch({type: ERROR, payload: res.response?.data.message})
        }
    } catch (error) {
        dispatch({type: ERROR, payload: error.response?.data.message || "something is wrong, please try after sometime."})
    }
}
export const getAllJobsByCategory = (category, token)=> async(dispatch)=>{
    dispatch({type: LOADING})
    try {
        let res = await axios.get(`${process.env.REACT_APP_JOB_POSTING}/all/jobs/${category}`,  {headers: {Authorization: token}})
        res = await res?.data
        if(!res.issue){
            dispatch({type: ALL_JOBS_GETTED, payload: res.data})
        }else{
            dispatch({type: ERROR, payload: res.response?.data.message})
        }
    } catch (error) {
        dispatch({type: ERROR, payload: error.response?.data.message || "something is wrong, please try after sometime."})
    }
}
// apply for job
export const postJobApplication = (jobData, token)=> async (dispatch)=> {
    dispatch({type: LOADING})
    try {
        let res = await axios.post(`${process.env.REACT_APP_APPLICATION}/apply`, jobData, {headers: {Authorization: token}})
        res = await res?.data
        if(!res.issue){
            dispatch({type: JOB_APPLIED, payload: res?.data})
        }else{
            dispatch({type: ERROR, payload: res.response?.data.message})
        }
    } catch (error) {
        dispatch({type: ERROR, payload: error.response?.data.message || "something is wrong, please try after sometime."})
    }
}

// get all the applications
export const getJobApplications = (token)=> async(dispatch)=>{
    dispatch({type: LOADING})
    try {
        let res = await axios.get(`${process.env.REACT_APP_APPLICATION}/user/all`,  {headers: {Authorization: token}})
        res = await res?.data
        if(!res.issue){
            dispatch({type: APPLIED_JOB_APPLICATION, payload: res.data})
        }else{
            dispatch({type: ERROR, payload: res.response?.data.message})
        }
    } catch (error) {
        dispatch({type: ERROR, payload: error.response?.data.message || "something is wrong, please try after sometime."})
    }
}
