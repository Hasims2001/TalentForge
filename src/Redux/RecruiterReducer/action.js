import axios from 'axios'
import { APPLICATION_GETTED, ERROR, JOB_DELETED, JOB_GETTED, JOB_POSTED, JOB_UPDATED, LOADING } from '../actionType'


export const getJobPost = (token) => async (dispatch)=>{
    dispatch({type: LOADING})
    try {
        let res = await axios.get(`${process.env.REACT_APP_JOB_POSTING}/all`,  {headers: {Authorization: token}})
        res = res?.data
        if(!res.issue){
            dispatch({type: JOB_GETTED, payload: res.data})
        }
        else{
            dispatch({type: ERROR, payload: res.response.data.message})
        }
    }catch(error){
   
    dispatch({type: ERROR, payload: error.response.data.message})
   }
}
export const postNewJobpost = (postData,token)=> async (dispatch) =>{
    dispatch({type: LOADING})
    try {
        let res = await axios.post(`${process.env.REACT_APP_JOB_POSTING}/create`, postData, {headers: {Authorization: token}})
        res = res?.data
        if(!res.issue){
            dispatch({type: JOB_POSTED, payload: res.data})
        }
        else{
            dispatch({type: ERROR, payload: res.response.data.message})
        }
   }catch(error){
   
    dispatch({type: ERROR, payload: error.response.data.message})
   }
}

export const updateJobPost = (jobData, id, token)=> async(dispatch)=>{
    dispatch({type: LOADING})
    try {
        let res = await axios.patch(`${process.env.REACT_APP_JOB_POSTING}/update/${id}`, jobData,  {headers: {Authorization: token}})
        res = res?.data
        if(!res.issue){
            dispatch({type: JOB_UPDATED, payload: res.data})
        }
        else{
            dispatch({type: ERROR, payload: res.response.data.message})
        }
    }catch(error){
   
    dispatch({type: ERROR, payload: error.response.data.message})
   }
}
export const deleteJobPost = (id, token)=> async(dispatch)=>{
    dispatch({type: LOADING})
    try {
        let res = await axios.delete(`${process.env.REACT_APP_JOB_POSTING}/delete/${id}`,  {headers: {Authorization: token}})
        res = res?.data
        if(!res.issue){
            dispatch({type: JOB_DELETED, payload: id})
        }
        else{
            dispatch({type: ERROR, payload: res.response.data.message})
        }
    }catch(error){
   
    dispatch({type: ERROR, payload: error.response.data.message})
   }
}

export const getJobApplications = (id, token)=> async(dispatch)=>{
    dispatch({type: LOADING})
    try {
        let res = await axios.get(`${process.env.REACT_APP_RECRUITER}/applications/${id}`,  {headers: {Authorization: token}})
        res = res?.data
        if(!res.issue){
            dispatch({type: APPLICATION_GETTED, payload: res.data})
        }else{
            dispatch({type: ERROR, payload: res.response.data.message})
        }
    }catch(error){
   
    dispatch({type: ERROR, payload: error.response.data.message})
   }
}