import axios from 'axios'
import { ERROR, JOB_POSTED, LOADING } from '../actionType'


export const postNewJobpost = (postData,token)=> async (dispatch) =>{
    dispatch({type: LOADING})
    try {
        let res = await axios.post(`${process.env.REACT_APP_RECRUITER}/newpost`, postData, {headers: {Authorization: token}})
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