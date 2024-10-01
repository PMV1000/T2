import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import categoriesReducer from '../reducers/client/common/categories';
import productsReducer from '../reducers/client/common/products';
import productDetailReducer from '../reducers/client/product.Detail';
import categoryReducer from '../reducers/client/category';
import filterReducer from '../reducers/client/common/search';
import { Userreducer } from '../reducers/client/common/user';
import cartreducer from "../reducers/client/cart"
import homeReducer from '../reducers/client/home';
import rightReducer from '../reducers/rights';
import usersReducer from '../reducers/users';


const rootReducer = combineReducers({
    categories: categoriesReducer,
    products: productsReducer,
    ProductDetail:productDetailReducer,
    category:categoryReducer,
    search:filterReducer,
    user:Userreducer,
    cart:cartreducer,
    home:homeReducer,
    rights:rightReducer,
    users:usersReducer
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;