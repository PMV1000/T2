import React from "react";
import { useLocation } from "react-router-dom";

const Thankyou = ()=>{
    const location = useLocation()
    if(!location.state?.fromPayment){
        window.location.href='/cart'
    }
    return (
        <body>
        <nav className='bg-orange)-500 text-white text-lg md:text-xl p-2 fixed top-0 w-full z-10 h-20 flex justify-start'>
            <a href="/" className="text-white">
                <i className="fas fa-arrow-left m-4" ></i></a></nav>
        <main className='w-full  my-28 over-flow-y-scroll  h-96'>
            <img src='/image/thankyou.jpg' alt=""  className="lg:w-2/3 w-4/5 h-3/5 mx-auto"/>
            <div className="mt-8 mx-auto lg:w-2/5 w-2/3 bg-yellow-100 flex-col justify-center">
                <h1 className=" flex justify-center font-semibold text-xl md:text-3xl text-orange-400"> Đặt Hàng Thành Công </h1>
                <h5 className="flex justify-center text-sm mt-6 font-semibold md:text-lg text-gray-400">Cảm ơn bạn đã đặt hàng</h5>

</div></main>
        </body>
    )
}

export default Thankyou;