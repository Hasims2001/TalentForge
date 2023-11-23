import axios from 'axios'
import { ERROR, LOADING, LOGINSUCCESS, REGISTERSUCCESS } from '../actionType'


export const doLogin = (API_URL, userData) => async(dispatch)=>{
    dispatch({type: LOADING})
    try {
        let res = await axios.post(API_URL, userData)
        res = await res?.data;
        if(!res.issue){
            dispatch({type: LOGINSUCCESS, payload: res.data})
        }else{
            dispatch({type: ERROR, payload: res.message})
        }
    } catch (error) {
        dispatch({type: ERROR, payload: error.message})
    }
}

export const doRegister = (API_URL, userData)=> async(dispatch)=>{
    dispatch({type: LOADING})
        let res = await axios.post(API_URL,userData)
        res = await res?.data;
        if(!res.issue){
            dispatch({type: REGISTERSUCCESS, payload: res.message})
        }else{
            dispatch({type: ERROR, payload: res.message})
        }
   
}
export const postLoginJobseeker =(userData) => async(dispatch)=>{
    dispatch(doLogin(`${process.env.REACT_APP_JOB_SEEKER}/login`,userData))
}


export const postRegisterJobseeker =(userData) => async(dispatch)=>{
    dispatch(doRegister(`${process.env.REACT_APP_JOB_SEEKER}/register`,userData))
}

export const postLoginRecruiter =(userData) => async(dispatch)=>{
    dispatch(doLogin(`${process.env.REACT_APP_RECRUITER}/login`,userData))
   
}

export const postRegisterRecruiter =(userData) => async(dispatch)=>{
    dispatch(doRegister(`${process.env.REACT_APP_RECRUITER}/register`,userData))
}