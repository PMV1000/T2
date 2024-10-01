import { setRight } from "../action/right"

const initalState={
    rights:[]
}

const rightReducer = (state=initalState,action)=>{
    switch(action.type){
        case "SET_RIGHT":
            return {...state,rights:action.payload}
        default:
            return state
    }

}

export default rightReducer;