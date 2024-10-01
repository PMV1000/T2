import { SET_USER } from "../../../action/client/header";

export const initialState = {
    user:{},
};
export const Userreducer= (state=initialState,action)=>{
    switch(action.type){
        case SET_USER:
            return {...state,user:action.payload}
        default:
            return state;
    }
};