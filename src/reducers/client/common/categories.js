import { SET_CATEGORIES } from "../../../action/client/common";
import { REMOVE_CATERGORY,ADD_CATEGORY } from "../../../action/client/category";

const initalState = {
    categories:[]
};

const categoriesReducer = (state=initalState, action)=>{
    switch(action.type){
        case SET_CATEGORIES:
            return {...state,categories:action.payload};
        case REMOVE_CATERGORY:
            return{...state,categories:state.categories.filter(item=>item.id!==action.payload)}
        case ADD_CATEGORY:
            switch(action.payload.supId){

            
                case null :
                    return {...state,categories:[state.categories,action.payload.cat]}
                
                default:
                    const temp =[state.categories]
                    if(temp.find(item=>item.id===action.payload.supId)){
                        temp.find(item=>item.id===action.payload.supId).categoryChild=[temp.find(item=>item.id===action.payload.supId).categoryChild,action.payload.cat.id] 
                    }
                    return {...state,categories:state}
                }
                
        default:
            return state;
    }
}

export default categoriesReducer