import {createSlice} from '@reduxjs/toolkit'

const cartSlice = createSlice({
    name:'cart',
    initialState:{
        dataCartProduct:[],
        cart:null,
        selectProduct:[]
    },
    reducers:{
        setCart(state,action){
            state.cart=action.payload
        },
        setDataProductsCart(state,action){
            state.dataCartProduct=action.payload

        },
        setSelectProduct(state,action){
            state.selectProduct=action.payload
        },
        addToCart(state,action){
            const {productId,quantity}=action.payload;
            const exist =state.cart.products.find(item=>item.productId===productId)

            if(!exist){
                state.cart.products.push({productId,quantity});
            }
            else{
                exist.quantity+=quantity
            }
        },

        removeFormCart(state,action){
            const productId =action.payload
            state.cart.products.filter(item=>item.productId!==productId)
        }
    }
});

export const {
    setCart,
    setDataProductsCart,
    setSelectProduct,
    addToCart,
    removeFormCar
}=cartSlice.actions;

export default cartSlice.reducer;