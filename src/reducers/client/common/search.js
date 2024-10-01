import { SET_FILTER_ITEMS } from "../../../action/client/common/search";

const initalState = {
    filterItems:[],
};

const filterReducer = (state=initalState,action)=>{
    switch( action.type){
        case SET_FILTER_ITEMS:
            return{...state,filterItems:action.payload}
        default:
            return state;
    }
};

export default filterReducer;