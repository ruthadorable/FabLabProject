import allmachines from '../listemachines/allmachines'
import axios from 'axios'
import {
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_FAIL,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,
} from '../constants/productConstants'
export const listMachines = ()=>async(dispatch)=>{
    try{
        dispatch({type: PRODUCT_LIST_REQUEST})
        const {data}=await axios.get('/api/allmachines')
        dispatch({
            type: PRODUCT_LIST_SUCCESS,
            payload: data
        })
    }catch(error){
        dispatch({
            type: PRODUCT_LIST_FAIL,
            payload:
                 (error.response && error.response.data.message 
            ? error.response.data.message 
            : error.message),
        })
    }

}

export const listMachineDetails = (id)=>async(dispatch)=>{
    try{
        dispatch({type: PRODUCT_LIST_REQUEST})
        const {data}=await axios.get(`/api/allmachines/${id}`)
        dispatch({
            type: PRODUCT_LIST_SUCCESS,
            payload: data
        })
    }catch(error){
        dispatch({
            type: PRODUCT_LIST_FAIL,
            payload:
                 (error.response && error.response.data.message 
            ? error.response.data.message 
            : error.message),
        })
    }

}