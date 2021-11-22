import {
    MACHINE_LIST_REQUEST,
    MACHINE_LIST_SUCCESS,
    MACHINE_LIST_FAIL,
} from '../constants/machineConstants'
export const machineListReducer=(state ={machines:[]},action)=>
{
    switch(action.type){
        case 'MACHINE_LIST_REQUEST':
            return {loading: true, machines:[]}
        case 'MACHINE_LIST_SUCCESS':
            return {loading : false,machines: action.payload}
        case 'MACHINE_LIST_FAIL': 
            return { loading: false,error: action.payload}
        default: 
            return state
    }
}
export const machineDetailsReducer=(state ={product:{reviews:[]}},action)=>
{
    switch(action.type){
        case 'MACHINE_DETAILS_REQUEST':
            return {loading: true, ...state}
        case 'MACHINE_DETAILS_SUCCESS':
            return {loading : false,product : action.payload}
        case 'MACHINE_DETAILS_FAIL': 
            return { loading: false,error: action.payload}
        default: 
            return state
    }
}