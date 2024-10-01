export const SET_PRODUCTS_IN_PAGE="SET_IN_PAGE";
export const SORT="SORT";

export const setInPage = (products)=>({type:SET_PRODUCTS_IN_PAGE,payload:products});
export const sort= (sortValue,products)=>({type:SORT,payload:{sortValue:sortValue,products:products}});


