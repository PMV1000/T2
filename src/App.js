// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Cart from './components/cart';
import Category from './components/category';
import Header from './components/header';

import Home from './components/Home';
import Search from './components/Search';
import ProductDetail from './components/productDetail'
import Payment from './components/payment.jsx'
import Thankyou from './components/thankyou'
import Login from "./components/login.jsx"
import Signup from './components/signup'
import Admin from './components/admin/admin.jsx'
import ManageCategory from './components/admin/adminCategory.jsx';
import ManageProduct from './components/admin/adminProduct.jsx';
import './App.css';
import './index.css';
import './main.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import '@fortawesome/fontawesome-free/css/all.min.css';
// import store from './store';

function App() {
    // function Header (){
    //     const location = useLocation();
    // const isAdmin = location.pathname.startsWith('/admin');}
   
    
    return (
        // <Provider store={store}></Provider>
        <Router>
            <div>
                <Header className='App-header bg-gradient-to-r from-red-500 to-yellow-500'/>
                
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/productDetail/:id" element={<ProductDetail />} />
                    <Route path ="/payment" element={<Payment/>}/>
                    <Route path ="/thankyou" element={<Thankyou/>}/>
                    <Route path="/category" element={<Category />} />
                    <Route path="/search/:param" element={<Search />} />
                    
                    <Route path="/signup" element={<Signup/>} />
                    <Route path="/login" element={<Login/>} />
                    <Route path='/admin' element={<Admin/>}/>
                       
                    <Route path="/manageCategory" element={<ManageCategory/>}/>
                    <Route path="/manageProduct" element={<ManageProduct/>}/>
                </Routes>
            </div>
        </Router>
    );
}

export default App;
