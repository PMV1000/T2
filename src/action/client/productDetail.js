
export const setProduct = (product)=>({
    type:"SET_PRODUCTS",
    payload: product,
});

export const setEr = (error)=>({
    type:'SET_ERROR',
    payload: error,

});

export const setQuantity = (quantity)=>({
    type:'SET_QUANTITY',
    payload:quantity,
})