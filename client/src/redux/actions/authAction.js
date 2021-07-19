import {getDataAPI, postDataAPI} from '../../utils/fetchDataAPI'
import { GLOBAL_TYPES } from './globalTypes'

export const login = ({userData})=>async(dispatch)=>{
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
        
        // Write firstLogin into localStorage.
        localStorage.setItem('firstLogin', true)

        dispatch({type: GLOBAL_TYPES.ALERT, payload: {success: res.data.msg}})
    }catch(err){
        dispatch({
            type: GLOBAL_TYPES.ALERT,
            payload: {
                loading: err.response.data.message
            }
        })
    }
}