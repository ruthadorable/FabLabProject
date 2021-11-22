import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import {
  machineListReducer,
  machineDetailsReducer,
  machineDeleteReducer,
  machineCreateReducer,
  machineUpdateReducer,
  machineReviewCreateReducer,
  machineTopRatedReducer,
} from './reducers/machineReducers'
import { useReducer, useCallback } from 'react';
import { utilisationReducer } from './reducers/utilisationReducers'

const middleware = [thunk]

const store = createStore(
  
  composeWithDevTools(applyMiddleware(...middleware))
)
const reducer = combineReducers({
  machineList: machineListReducer,
  machineDetails: machineDetailsReducer,
  /*utilisation: [utilisationReducers,null],
  machineDelete:machinetDeleteReducer,
  machineCreate: machineCreateReducer,
  machineUpdate: machineUpdateReducer,
  machineReviewCreate: machineReviewCreateReducer,
  machineTopRated: machineTopRatedReducer,*/
  /*userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  userUpdate: userUpdateReducer,
  utilisationCreate: utilisationCreateReducer,
  utilisationDetails: utilisationDetailsReducer,
  utilisationPay: utilisationPayReducer,
  utilisationListMy: utilisationListMyReducer,
  utilisationList: utilisationListReducer,*/
})

export default store