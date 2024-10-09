import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import diacritics from 'diacritics';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import '../App.css';
import SiderUser from './siderUser'

const removeDiacritics = (text) => {
    return diacritics.remove(text).toLowerCase().trim().replace(/\s+/g, ' ');
}

const Filter = () =>{
   const handleClick = (e)=>{
        
        // const value = e.target.value
        // console.log(value)
        const url = new URL(window.location.href)
        url.searchParams.set('sort',e.target.value)
        window.location.href=url.toString()

  }      




const handleSortButtonClick = (e) => {
            e.preventDefault();
            const sortElement = document.getElementById('sort');
            if (sortElement) {
               
                sortElement.classList.toggle('hidden');
            }
        };

// const handleSortButtonOnBlur = (e)=>{
//             e.preventDefault();
//             const sortElement =document.querySelector('#sort');
//             if (!sortElement.classList.contains('hidden')){
//                 sortElement.classList.add('hidden')
//             }

// }
    return (
        <form className=' head text-white font-4  md: mx-4 '>
           <button id='sort-btn' className="fas fa-filter" onClick={handleSortButtonClick} >
            {/* onBlur={handleSortButtonOnBlur} */}
           </button>
           <div name="sort by" id="sort"className='fixed p-4 top-16 right-4 text-black font-medium w-32 p-1 shadow hidden'>
            <button value="A To Z" className='text-sm block mx-auto py-1 hover:text-gray-500'onClick={handleClick} type='button'> A-Z</button>
            <hr />

            <button value="Z To A" className='text-sm block mx-auto hover:text-gray-500' onClick={handleClick} type='button'>Z-A</button>
            <hr />
            <button value="Low To High" className='text-sm block mx-auto hover:text-gray-500' onClick={handleClick} type='button'>Giá Tăng Dần</button>
            <hr />
            <button value="High To Low" className='text-sm block mx-auto py-1 hover:text-gray-500' onClick={handleClick} type='button'>Giá Giảm Dần </button>
           
           </div>

        </form>
    )
}
const SearchForm = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState([]);
    const [filterItems, setFilterItems] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('/api/products');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setProducts(data);
            } catch (error) {
                console.error('Fetch error:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    useEffect(() => {
        const query = removeDiacritics(searchTerm);
        if (query) {
            const items = products.filter(product =>
                typeof product.name === 'string' &&
                removeDiacritics(product.name).includes(query)
            );
            setFilterItems(items);
        } else {
            setFilterItems([]);
        }
    }, [searchTerm, products]);
    

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchTerm) {
            navigate(`/search/${searchTerm}`, {
                state: {
            
                    filterItems: filterItems,
                }
            });
        }
    };

    const handleSuggest = (e) => {
        e.preventDefault();
        setSearchTerm(e.target.value);
    };

    const btnClick= ()=>{
        const SearchElement = document.getElementById('search')
        SearchElement.classList.remove('hidden')
    }

    const btnBlur =()=>{
        const SearchElement =document.querySelector('#search');
        if(!SearchElement.classList.contains('hidden')) {
            SearchElement.classList.add('hidden')
        }

    }



    return (
        <div className='w-auto justify-start'>
            <form className="d-flex bg-white text-black rounded-md  w-40  md:px-6 md:w-56" onSubmit={handleSearch}>
                <input
                    className="form-control w-32 md:w-auto border-white over-flow-y-scroll text:xs md:text-md border-none shadow-none"
                    type="search"
                    placeholder="Search..."
                    aria-label="Search"
                    onChange={handleSuggest}
                    onClick={btnClick}
                    onBlur={btnBlur}
                />
                <button className="btn text-gray-500 "  type="submit">
                    <i className=" z-2 p-1  hover:bg-gray-50 fas fa-search"></i>
                </button>
            </form>
            <div>
               {
                    <div className={( searchTerm.length===0)?'hidden':'bg-white my-4 w-40 md:w-56  border border-gray-300 rounded-md fixed top-7 right-22 hidden'} id='search'>
                        {loading ? (
                            <p>Loading...</p>
                        ) : (filterItems.length===0 && searchTerm.length===0) ? (
                            ( searchTerm.length===0)?(<p className='hidden'></p>):(<p className='flex justify-center mt-8 text-gray-500 flex-shrink-0 text-xs md:text-sm font-medium'>không có sản phẩm nào </p>)
                        ) : ( (
                            <ul className='space-y-4 mt-8'>
                                {filterItems.map(item => (
                                    <li key={item.id} className='text-gray-700 text-sm hover:bg-gray-100'>
                                        <Link to={`/productDetail/${item.id}`} className='text-gray-700'>{item.name}</Link>
                                    </li>
                                ))}
                            </ul>
                        ))}
                    </div>
                }
            </div>
        </div>
    );
}

const Header =  () => {
    
    const [code,setCode]= useState('')
    const [ser,SetUser]= useState({})
    const navigate = useNavigate()
    const location = useLocation()
    
useEffect(()=>{
    setCode(Cookies.get('code'))

   
const main =async()=>{

   
    const rres=await fetch ('/api/users') 
    const users = await rres.json()
    const User = users.find(item=>item.code===code)
    if(User){
       
       SetUser(User)
       console.log(ser,"hh")
    

    }
    else{setCode('')}

   
}
main()

console.log(ser,"h")

},[code,ser])
    

    


 
const siderU = (id)=>{
    const siderUser = document.getElementById(id)
    siderUser.classList.toggle('hidden')
}
  



useEffect(
    ()=>{

const check=()=>{
if(location.pathname==="/"){
       
    if(ser.type==="contentAdmin"||ser.type==="admin"){
        
        
        console.log(ser,"j")
         navigate('/admin')
    }
    else{
        console.log("ser")
    }
}}

check()
    
    }
,[ser,location.pathname,navigate])


    return (
        <nav className='bg-gradient-to-b from-red-600 to-orange-500  md:p-4 w-full flex items-center justify-center text-base font-semibold fixed top-0 left-0 z-10  text-xs lg:text-xl h-16'>
            <ul className='flex md:ml-36 mt-2 w-2/3 sm:menu-i md:flex md:mx-44 md:mr-4'>
                <li className='flex hover:bg-orange-300 focus:text-yellow-200 p-1 md:px-4  no-underline'>
                    <Link to='/' className='text-yellow-50 no-underline w-16 md:text-2xl md:w-auto'>Trang Chủ</Link>
                </li>
                <li className='flex hover:bg-orange-300 focus:text-yellow-200 p-1 px-2 md:px-4'>
                    <Link to='/cart' className={(code)?'text-yellow-50 w-16 md:w-auto md:text-2xl  no-underline':"hidden w-0"}>Giỏ Hàng</Link>
                </li>
              
                <li className='flex hover:bg-orange-300 focus:text-yellow-200 p-1  md:px-4'>
                    <Link to='/category' className='text-yellow-50 w-16 md:w-auto md:text-2xl no-underline'>Danh Mục</Link>
                </li>
            </ul>
            <button className={code?"hidden":"border-2 border-white px-2 h-10 mt-1 mx-4 w-36 rounded-md"}>
                <Link to='/login' className='no-underline  text-white text-sm font-semibold'>Đăng Nhập </Link>
            </button>
            <SearchForm />
            <Filter/>
            <i className={(code)?"far fa-user font-bold text-white":"hidden"} onClick={()=>{siderU('user-sider')}}></i>
            <SiderUser  user={ser}/>
        </nav>
    );
}

export default Header;
