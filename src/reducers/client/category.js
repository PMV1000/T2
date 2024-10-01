import { SET_CATEGORY_PRODUCTS } from "../../action/client/category";

const initalState = {
    categoryProducts:[],
}

const categoryReducer = (state=initalState,action)=>{
    switch(action.type){
        case SET_CATEGORY_PRODUCTS:
            return{...state,categories:action.payload}
        default:
            return state;
    }
};

export default categoryReducer;