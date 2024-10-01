import { SET_PRODUCTS_IN_PAGE,SORT } from "../../action/client/home";

const initialState = {
    products:[],
    
};

const homeReducer = (state=initialState,action)=>{
    switch(action.type){
        case SET_PRODUCTS_IN_PAGE:
            return{
                ...state,
                products:action.payload,
            };
        case SORT :
            const sorted = [...action.payload.products]; // Lấy danh sách sản phẩm từ payload
            switch (action.payload.sortValue) {
                case 'Low To High':
                    sorted.sort((a, b) => a.price - b.price);
                    break;
                case 'High To Low':
                    sorted.sort((a, b) => b.price - a.price);
                    break;
                case 'A To Z':
                    sorted.sort((a, b) => a.name.localeCompare(b.name));
                    break;
                case 'Z To A':
                    sorted.sort((a, b) => b.name.localeCompare(a.name));
                    break;
                default:
                    break;
            }
            return sorted
            
    default:
        return state;
    }
}

export default homeReducer;