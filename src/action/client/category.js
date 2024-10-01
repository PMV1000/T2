
export const SET_CATEGORY_PRODUCTS ="SET_CATERGORY_PRODUCT"
export const REMOVE_CATERGORY ="RM_CAT"
export const ADD_CATEGORY ="ADD_CAT"

export const setCategoryProducts = (products)=>({
    type:SET_CATEGORY_PRODUCTS,
    payload:products,
});

export const removeCategory = (catid)=>({
    type:REMOVE_CATERGORY,
    payload:catid,
})

export const addCategory = (cat,supId)=>({
    type:ADD_CATEGORY,
    payload:{cat:cat,supId:supId}
})