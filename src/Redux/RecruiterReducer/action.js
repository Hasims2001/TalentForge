import axios from 'axios'
import { APPLICATION_GETTED, APPLICATION_UPDATED, ERROR, GOT_AI_OUTPUT_RECRUITER, JOB_DELETED, JOB_GETTED, JOB_POSTED, JOB_UPDATED, LOADING } from '../actionType'


export const getJobPost = (id, token) => async (dispatch)=>{
    dispatch({type: LOADING})
    try {
        let res = await axios.get(`${process.env.REACT_APP_JOB_POSTING}/all/${id}`,  {headers: {Authorization: token}})
        res = await res?.data
        if(!res.issue){
            dispatch({type: JOB_GETTED, payload: res.data})
        }
        else{
            dispatch({type: ERROR, payload: res.response?.data.message})
        }
    }catch(error){
   
    dispatch({type: ERROR, payload: error.response?.data.message || "something is wrong, please try after sometime."})
   }
}
export const postNewJobpost = (postData,token)=> async (dispatch) =>{
    dispatch({type: LOADING})
    try {
        let res = await axios.post(`${process.env.REACT_APP_JOB_POSTING}/create`, postData, {headers: {Authorization: token}})
        res = await res?.data
        if(!res.issue){
            dispatch({type: JOB_POSTED, payload: res.data})
        }
        else{
            dispatch({type: ERROR, payload: res.response?.data.message})
        }
   }catch(error){
   
    dispatch({type: ERROR, payload: error.response?.data.message || "something is wrong, please try after sometime."})
   }
}

export const updateJobPost = (jobData, id, token)=> async(dispatch)=>{
    dispatch({type: LOADING})
    try {
        let res = await axios.patch(`${process.env.REACT_APP_JOB_POSTING}/update/${id}`, jobData,  {headers: {Authorization: token}})
        res = await res?.data
        if(!res.issue){
            dispatch({type: JOB_UPDATED, payload: res.data})
        }
        else{
            dispatch({type: ERROR, payload: res.response?.data.message})
        }
    }catch(error){
   
    dispatch({type: ERROR, payload: error.response?.data.message || "something is wrong, please try after sometime."})
   }
}
export const deleteJobPost = (id, token)=> async(dispatch)=>{
    dispatch({type: LOADING})
    try {
        let res = await axios.delete(`${process.env.REACT_APP_JOB_POSTING}/delete/${id}`,  {headers: {Authorization: token}})
        res = await res?.data
        if(!res.issue){
            dispatch({type: JOB_DELETED, payload: id})
        }
        else{
            dispatch({type: ERROR, payload: res.response?.data.message})
        }
    }catch(error){
   
    dispatch({type: ERROR, payload: error.response?.data.message || "something is wrong, please try after sometime."})
   }
}

export const getJobApplications = (id, token)=> async(dispatch)=>{
    dispatch({type: LOADING})
    try {
        let res = await axios.get(`${process.env.REACT_APP_RECRUITER}/applications/${id}`,  {headers: {Authorization: token}})
        res = await res?.data
        if(!res.issue){
            dispatch({type: APPLICATION_GETTED, payload: res.data})
        }else{
            dispatch({type: ERROR, payload: res.response?.data.message})
        }
    }catch(error){
   
    dispatch({type: ERROR, payload: error.response?.data.message || "something is wrong, please try after sometime."})
   }
}


export const updateJobApplications = (appData, id, token)=> async(dispatch)=>{
    dispatch({type: LOADING})
    try {
        let res = await axios.patch(`${process.env.REACT_APP_RECRUITER}/applications/${id}`,appData,  {headers: {Authorization: token}})
        res = await res?.data
        if(!res.issue){
            dispatch({type: APPLICATION_UPDATED, payload: res.data})
        }else{
            dispatch({type: ERROR, payload: res.response?.data.message})
        }
    }catch(error){
   
    dispatch({type: ERROR, payload: error.response?.data.message || "something is wrong, please try after sometime."})
   }
}


// Recommended Jobseeker
export const getRecommendedJobseeker = (query, token) => async (dispatch)=>{
    dispatch({type: LOADING})
    try {
        let res = await axios.post(`${process.env.REACT_APP_APPLICATION}/recommend`,query,  {headers: {Authorization: token}})
        res = await res?.data
        if(!res.issue){
            dispatch({type: GOT_AI_OUTPUT_RECRUITER, payload: res})
        }else{
            dispatch({type: ERROR, payload: res.message})
        }
    }catch(error){
        dispatch({type: ERROR, payload: error.message})
    // dispatch({type: ERROR, payload: error.response?.data.message || "something is wrong, please try after sometime."})
   }
}