import {
    FACTURE_ADD_ITEM,
    FACTURE_REMOVE_ITEM,
    FACTURE_CLEAR_ITEMS,
  } from '../constants/factureConstants'
  
  export const factureReducer = (
    state = { factureItems: [], shippingAddress: {} },
    action
  ) => {
    switch (action.type){
      case FACTURE_ADD_ITEM:
        const item = action.payload
  
        const existItem = state.factureItems.find((x) => x.machine === item.machine)
  
        if (existItem) {
          return {
            ...state,
            factureItems: state.factureItems.map((x) =>
              x.machine === existItem.machine ? item : x
            ),
          }
        } else {
          return {
            ...state,
            factureItems: [...state.factureItems, item],
          }
        }
      case FACTURE_REMOVE_ITEM:
        return {
          ...state,
          factureItems: state.factureItems.filter((x) => x.machine !== action.payload),
        }
      
      case FACTURE_CLEAR_ITEMS:
        return {
          ...state,
          factureItems: [],
        }
      default:
        return state
    }
  }