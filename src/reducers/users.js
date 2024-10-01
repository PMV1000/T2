import { REMOVE_ACCOUNT ,ADD_ACC,SET_USERS} from "../action/users";

const initalState= {
    users:[]
}

const usersReducer = (state=initalState,action)=>{
    switch(action.type){
        case SET_USERS:{
            return{...state,users:action.payload}

        };

        case REMOVE_ACCOUNT:
            return {...state,users:state.users.filter(item=>item!==action.payload)}

        case ADD_ACC:
            return {...state,users:[state.users,action.payload]}
        default: return state
    }
}

export default usersReducer;