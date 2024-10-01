

const initailState = {
    product: {},
    error : '',
    quantity: 1,
};

const productDetailReducer = (state=initailState, action)=>{
    switch (action.type){
        case "SET_PRODUCT":
            return {...state,product:action.payload};
        case "SET_ERROR":
            return{...state,error:action.payload}
        case 'SET_QUANTITY':
            return {...state,quantity:action.payload};
        default:
            return state;

    }
}
export default productDetailReducer