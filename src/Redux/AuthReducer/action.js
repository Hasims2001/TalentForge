import axios from 'axios'
import { ACCOUNT_DELETED, ACCOUNT_UPDATED, ERROR, LOADING, LOGINSUCCESS, REGISTERSUCCESS } from '../actionType'
import Cookies from 'js-cookie'


export const doLogin = (API_URL, userData) => async(dispatch)=>{
    dispatch({type: LOADING})
       try{
        let res = await axios.post(API_URL, userData)
        res = await res?.data;
        if(!res.issue){
            dispatch({type: LOGINSUCCESS, payload: res.data})
        }else{
            console.log(res)
            dispatch({type: ERROR, payload: res.response.data.message})
        }
       }catch(error){
       
        dispatch({type: ERROR, payload: error.response.data.message})
       }
  
}

export const doRegister = (API_URL, userData)=> async(dispatch)=>{
    dispatch({type: LOADING})
      try{
        let res = await axios.post(API_URL,userData)
        res = await res?.data;
        if(!res.issue){
            dispatch({type: REGISTERSUCCESS, payload: res.message})
        }else{
            dispatch({type: ERROR, payload: res.response.data.message})
        }
      }catch(error){
        dispatch({type: ERROR, payload: error.response.data.message})
      }
   
}

export const updateAccount = (API_URL, userData, token)=> async (dispatch)=>{
    dispatch({type: LOADING})
    let res = await axios.patch(API_URL, userData, { headers: { Authorization: token} });
    res = await res?.data;
    if(!res.issue){
        Cookies.set('user', JSON.stringify(res.data))
        dispatch({type: ACCOUNT_UPDATED, payload: res.data})
    }else{
        dispatch({type: ERROR, payload: res.message})
    }
}

export const deleteAccount = (API_URL, token) => async (dispatch)=>{
    dispatch({type: LOADING})
    let res = await axios.delete(API_URL, { headers: { Authorization: token} });
    res = await res?.data;
    if(!res.issue){
        dispatch({type: ACCOUNT_DELETED, payload: res.data})
    }else{
        dispatch({type: ERROR, payload: res.message})
    }
}
export const postLoginJobseeker =(userData) => async(dispatch)=>{
    dispatch(doLogin(`${process.env.REACT_APP_JOB_SEEKER}/login`,userData))
}

export const postLoginRecruiter =(userData) => async(dispatch)=>{
    dispatch(doLogin(`${process.env.REACT_APP_RECRUITER}/login`,userData))
}

export const postRegisterJobseeker =(userData) => async(dispatch)=>{
    dispatch(doRegister(`${process.env.REACT_APP_JOB_SEEKER}/register`,userData))
}

export const postRegisterRecruiter =(userData) => async(dispatch)=>{
    dispatch(doRegister(`${process.env.REACT_APP_RECRUITER}/register`,userData))
}


export const updateAccountJobseeker =(userData, id, token) => async(dispatch)=>{
    dispatch(updateAccount(`${process.env.REACT_APP_JOB_SEEKER}/update/${id}`,userData,  token))
}
export const updateAccountRecruiter =(userData, id, token) => async(dispatch)=>{
    dispatch(updateAccount(`${process.env.REACT_APP_RECRUITER}/update/${id}`,userData,  token))
}

export const deleteAccountJobseeker =(id, token) => async(dispatch)=>{
    dispatch(deleteAccount(`${process.env.REACT_APP_JOB_SEEKER}/delete/${id}`, token))
}

export const deleteAccountRecruiter =(id, token) => async(dispatch)=>{
    dispatch(deleteAccount(`${process.env.REACT_APP_RECRUITER}/delete/${id}`, token))
}