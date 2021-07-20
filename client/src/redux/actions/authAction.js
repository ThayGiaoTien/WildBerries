import {getDataAPI, postDataAPI} from '../../utils/fetchDataAPI'
import { GLOBAL_TYPES } from './globalTypes'
import valid from '../../utils/valid'

export const login = (userData, history)=>async(dispatch)=>{
    console.log(userData)
    try{
        dispatch({type: GLOBAL_TYPES.ALERT, payload: {loading: true}})
        
        const res= await postDataAPI('login', userData)
        dispatch({
            type: GLOBAL_TYPES.AUTH,
            payload: {
                token: res.data.access_token,
                user: res.data.user
            }
        })
        history.push('/')
        
        // Write firstLogin into localStorage.
        localStorage.setItem('firstLogin', true)

        dispatch({type: GLOBAL_TYPES.ALERT, payload: {success: res.data.msg}})
    }catch(err){
        dispatch({
            type: GLOBAL_TYPES.ALERT,
            payload: {
                error: err.response.data.msg  //msg not message
            }
        })
    }
}

export const register= (userData, history)=>async(dispatch)=>{
    // Filter user data input.
    const {errMsg, errLength}= valid(userData)
    if(errLength>0) {
        return dispatch({                               // Here we use return to stop sending data to server if there was errors.
            type: GLOBAL_TYPES.ALERT,
            payload: errMsg
        })
    }
    try{
        dispatch({type: GLOBAL_TYPES.ALERT, payload: {loading: true}})
        const res= await postDataAPI('register', userData)
        dispatch({
            type: GLOBAL_TYPES.AUTH,
            payload: {
                access_token: res.data.access_token
            }
        })
        history.push('/')

        dispatch({type: GLOBAL_TYPES.ALERT, payload: res.data.msg})
        localStorage.setItem('firstLogin', true)
        
    }catch(err){
        dispatch({type: GLOBAL_TYPES.ALERT, payload:{error: err.response.data.msg}})
    }   
}

export const refresh_token=()=>async(dispatch)=>{
    // Check weather user logged in by firstLogin.
    const firstLogin= localStorage.getItem('firstLogin')
    if(firstLogin){
        dispatch({type: GLOBAL_TYPES.ALERT, payload: {loading: true}})
        try{
            const res= await postDataAPI('refresh_token')
            dispatch({
                type: GLOBAL_TYPES.AUTH,
                payload: {
                    token: res.data.access_token,
                    user: res.data.user
                }
            })

            dispatch({type: GLOBAL_TYPES.ALERT, payload: {loading: false}})
        
        }catch(err){
            dispatch({type: GLOBAL_TYPES.ALERT, payload:{error: err.response.data.msg}})
    
        }
    }
    
}

export const logout = () =>async(dispatch)=>{
    
    try{
        // Remember that we added a item to localStorage. Now we need to remove
        localStorage.removeItem('firstLogin')
        const res= await getDataAPI('/login')
        window.location.href='/'

        dispatch({
            type: GLOBAL_TYPES.ALERT,
            payload: {
                message: res.data.msg
            }
        })
    }catch(err){
        dispatch({type: GLOBAL_TYPES.ALERT, payload:{error: err.response.data.msg}})
    }
}