import React, { useState, useEffect } from 'react';
import {  useLocation } from 'react-router-dom';
import Card from './card'
const Home = () => {
    const [products, setProducts] = useState([]);
    const [sorted, setSorted]=useState([])
    const [currentPage, setPage]=useState(1)
    const [QuanPage, setQuanPage]=useState(9)
  
   
    // Trong đó currentPage[0] lưu trang đang chọn, ...[1] lưu số trang ở đầu dãy , [2] lưu tổng ố trang hiện có
   

    const location = useLocation();
    useEffect(() => {
      console.log("vào UE")
      console.log(currentPage)
        const fetchProducts = async () => {
            try {
                const response = await fetch('/api/products');
                if (!response.ok) {
                    throw new Error("Network response wasn't ok");
                }
                const data = await response.json();
                const filterData = data.filter(product => !product.deleted && product.isFeature);
                setQuanPage(filterData>9?Math.round(filterData.length/4):9)
                setProducts(filterData.slice(4*(currentPage-1),4*currentPage));
                
            } catch (err) {
                console.error(err.message);
            }
        };
        
        fetchProducts();
    }, [currentPage]);

    
    useEffect(() => {
        const query = new URLSearchParams(location.search);
        const sortValue = query.get('sort');

        let sortedProducts = [...products];

        switch (sortValue) {
            case 'Low To High':
                sortedProducts.sort((a, b) => a.price - b.price);
                break;
            case 'High To Low':
                sortedProducts.sort((a, b) => b.price - a.price);
                break;
            case 'A To Z':
                sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case 'Z To A':
                sortedProducts.sort((a, b) => b.name.localeCompare(a.name));
                break;
            default:
                break; 
        }

        setSorted(sortedProducts);
    }, [location.search, products]);

   const  changePage=(current)=>{
    setPage(current)
 
   
   
    
    
    }
    return (
<div className="container mt-28 mx-auto w-full " >
  <div >
   <div className="flex flex-wrap gap-3 justify-center items-center md:justify-start md:items-start mb-60" >{sorted.length > 0 ? (
      sorted.map(product => (
        <Card key={product.id} product={product} />
      ))
    ) : (
      <p className="text-gray-600 text-xl text-center font-medium mb-80">No products found.</p>
    )}</div> 
    <nav className=" " aria-label="...">
  <ul className="pagination w-full flex justify-center ">
    <li className="page-item ">  
      <button className="page-link" href="" onClick={()=>{if(currentPage>1) {changePage(currentPage-1)}}}>&#60;&#60;</button>
    </li>
    {[1,2,3,4,5,6].map(page=>(

   
    <li className="page-item"  ><button   className={((currentPage-1+6 >QuanPage)?(QuanPage-6+page+1):(currentPage-1+page+1))===currentPage?"page-link active":"page-link"} onClick={()=>{changePage((currentPage-1+6 >QuanPage)?(QuanPage-6+page):(currentPage-1+page))}}>{(currentPage-1+6 >QuanPage)?(QuanPage-6+page):(currentPage-1+page)}</button></li>
    ))}
   
    <li className="page-item">
      <button className="page-link"   onClick={()=>{if(currentPage<QuanPage) {changePage(currentPage+1)}}}> &#62;&#62;</button>
    </li>
  </ul>
</nav>
  </div>
</div>


    );
};

export default Home;
