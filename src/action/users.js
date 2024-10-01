export const  REMOVE_ACCOUNT="RM_ACC";
export const  ADD_ACC="ADD_ACC"
export const SET_USERS= "SET_USERS_ACC"

export const setUsers = (users)=>({
    type:SET_USERS,
    payload:users
})

export const removeAcc= (id,)=>({
    type:REMOVE_ACCOUNT,
    payload:id,
})

export const addAdminAcc = (user)=>({
    type:ADD_ACC,
    payload:user,
})