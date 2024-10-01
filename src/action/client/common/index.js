export const SET_CATEGORIES = "SET_CATEGORIES_IN_CAT";
export const SET_PRODUCTS ="SET_PRODUCTS_IN_CAT";

export const setCategories = (categories)=>({
    type:SET_CATEGORIES,
    payload:categories
});

export const setProducts = (products)=>({
    type:SET_PRODUCTS,
    payload:products,
})
;