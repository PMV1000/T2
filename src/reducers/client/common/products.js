import { SET_PRODUCTS } from "../../../action/client/common";
import { REMOVE_PRODUCT,ADD_PRODUCT } from "../../../action/produtcs";

const initalState = {
    products:[],
};

const productsReducer = (state=initalState,action)=>{
    switch(action.type){
        case SET_PRODUCTS:
            return {...state,products:action.payload}
        case ADD_PRODUCT:
            return {...state,products:action.payload};
        case REMOVE_PRODUCT:
            return{...state,products:state.products.filter(item=>item.id!==action.payload)}
        default:
            return state;
}
};

export default productsReducer;