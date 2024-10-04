import React from "react";
import { useEffect,useState } from "react";
import { useNavigate,useLocation, useParams } from "react-router-dom";
const ProductDetail = () => {
const [product, setpro]=useState ({})
const [error,setE]=useState('')
const [quantity,setQuantity]= useState(1)

const NaviGate = useNavigate();
const Location = useLocation();
const { id } = useParams();

const addToCard = () => {
    NaviGate('/cart', {
        state: {
            ProductId: id,
            Quantity: quantity
        }
    });

  
}
useEffect (
    ()=>{
        const fetchPro=async ()=>{
              try{
            const response = await fetch (`/api/products/${id}`)
           
                if(!response.ok){
             throw new Error ("Lỗi", response.state)}
              const pro = await response.json()
            setpro(pro)
        }
        catch (err){
            console.error(err)
           
            setE(err)
        }
    
    }
      fetchPro()
    }
,[])

const changeQuan =async (e)=>{
    const quan = e.target.value
    console.log(quan,"quan")
   await  setQuantity(quan)
    

}


    return (
        <main className="w-full h-auto p-4 mt-20">
            <div  className="md:flex w-full">
                <div id="carouselExampleIndicators" className="carousel slide w-full" data-bs-ride="carousel" style={{width:'800px',height:'400px'}}>
                    <div className="carousel-indicators">
                        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                    </div>
                    <div className="carousel-inner shadow w-1/5">
                        <div className="carousel-item active">
                        <img src="/image/images1.jpg" className="d-block " alt="..."/>
                        </div>
                        <div className="carousel-item">
                        <img src="/image/images1.jpg" className="d-block " alt="..."/>
                        </div>
                        <div className="carousel-item">
                        <img src="/image/images1.jpg" className="d-block " alt="..."/>
                        </div>
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" id="pre" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                        <span className="carousel-control-next-icon" id="next" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                    </div>
                
                <div className=" h-auto  md:ml-24 mt-8 md:space-y-12 space-y-4 md:text-center">
                    <h1 className="text-red-500 font-semibold h-auto ml-4 text-3xl"> {product.name} </h1>
                    <p >
                        <del className="text-red-300 text-lg"> {(product.price*1000).toFixed(0)} đ</del>
                        <em className="text-orange-400 text-xl ml-6"> {(product.price*1000*(1-product.discount)).toFixed(0)} đ</em>
                         </p>
                    <div className=" fixed p-2 bottom-0 w-full  bg-orange-200 left-0 flex justify-center md:relative">
                        <input
                            min="1"
                            max="99"
                            placeholder="1"
                            step="1"
                            type="number"
                            className="border-2 h-9 mt-1 w-36 text-center"
                            // Giá trị được quản lý bởi state
                            onChange={changeQuan} // Hàm xử lý sự kiện
                                />
                        <button className="w-44 h-10  ml-8 text-lg font-medium text-white bg-orange-500 rounded-md" onClick={addToCard}> Mua Ngay</button></div></div>
            </div>
            <div className="w-full h-auto text-md font-normal mt-10 text-gray-600  mb-44">
                <h5 className=" text-lg text-gray-500 font-semibold"> Mô tả sản phẩm</h5>
                <p>   {product.desc}</p> </div>

        </main>
    );
}

                
                

export default ProductDetail;



    

    
