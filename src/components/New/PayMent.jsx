import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';


const Payment = ()=>{
    

    const [methodBanking, setmethod] = useState(false) 
    const navigate = useNavigate()
    const location = useLocation()
    const TOrF =location.state?.formcart||false
    const SelectPro =location.state?.selectedProduct||[]
    const Product=useSelector(state=>state.cart.selectProduct)

    useEffect(()=>{

         if(!TOrF||!SelectPro){
        navigate('/')}

         if(SelectPro.length===0){
        navigate('/cart')}

             
    },[])
   
    const compure =()=>{
        return Product.reduce((total,pro)=>{return total+(pro.quan*pro.info.price*(1-pro.info.discount))},0)
    }

    const changeMethod=(e)=>{
        if(e.target.value==="banking"){
        setmethod(true)}
        else {
            setmethod(false)
        }
    }
   const  submitPayment = ()=>{
    navigate('/thankyou',{
        state:{fromPayment:true}
    })
    }
    return(
        <main className="w-full mt-16">
            <form className='p-1  h-auto  w-full' onSubmit={submitPayment} >
                <h1 className='flex justify-center text-orange-300  font-semibold'> Xác nhận Thanh Toán</h1>
                <div className=" h-96 w-full mt-28 ml-8 md:ml-28">
                    <h4 className='text-orange-400 flex justify-start text-xl font-semibold'> Thông tin địa chỉ :</h4>
                    <div className='mt-8 ml-4 flex flex-wrap  md:ml-16 '>
                        <select name="province" className="border-1 border-gray-300 rounded-md h-6 w-36 md:w-48 text-gray-500 " required>
                            <option value="" disabled selected Chọn Tỉnh Thành className="text-gray-300"> Chọn Tỉnh Thành</option>
                            <option value="ha_noi"> Hà Nội</option>
                            <option value="tp_hcm"> TP HCM</option></select>

                        <select id="province" name="ditrict" className="md:w-48 w-36 h-6 border-1 border-gray-300 rounded-md md:ml-28 ml-12 text-gray-500" required>
                            <option value="" disabled selected Chọn Quận Huyện className="text-gray-300"> Chọn Quận/Huyện</option>
                            <option value="T_Binh"> Tân Bình</option> 
                            <option value="B_Thach">Bình Thạch</option> </select></div>

                        <input type="text" name="addressDetail" className="w-2/3 h-6 mt-6 rounded-md border-1 border-gray-300 ml-2 " placeholder="        Địa Chỉ" autocomplete="on" required/>

                    <h4 className='text-orange-400 flex justify-start mt-12 text-xl font-semibold'> Thông tin đơn hàng :</h4>
                    <div className=" md:p-4  ">
                        <table className="text-md texr-gray-400">
                        <thead>
                            <tr>
                            <th className="w-auto md:px-8 px-2 md:py-2"> Tên Sản Phẩm</th>
                            <th className="w-auto md:px-8 px-2 md:py-2"> Số Lượng</th>
                            <th className="w-auto md:px-8 px-2 md:py-2">Thành Tiền</th> </tr></thead>
                        <tbody >
                            {Product.map(pro=>(
                            <tr className='text-center'>
                                <td className="w-auto ">{pro.info.name}</td>
                                <td className="w-auto  text-center "> {pro.quan}</td>
                                <td className="w-auto  "> {(pro.quan*pro.info.price*(1-pro.info.discount))}đ</td></tr>
                            ))}
                           
                          </tbody></table>
                        
                        <em className="text-md font-semibold flex justify-end mt-4 md:mr-52  mr-4"> Tổng Thành Tiền : {compure()} đ</em></div>

                    <select onChange={changeMethod} className="my-4  mx-4  text-md text-gray-600 border-2 border-gray-700 rounded-md w-56" name="payment_method" required >
                        <option value="" disabled selected>Chọn Hình thức thanh toán </option> 
                        <option value="directly">Thanh Toán Khi Nhân Hàng</option> 
                        <option value="banking" >Thẻ Ngân Hàng</option>  </select>

                    <h4 className={methodBanking?'text-orange-400 text-lg flex justify-start font-semibold':'hidden'}>Thông Tin Tài Khoản</h4> 
                    <div className={methodBanking?" p-6 flex flex-col space-y-4  ":'hidden'}>
                        <select  className="mb-2   text-md text-gray-600 border-2 border-gray-400 rounded-md w-56" name="bank"  required={methodBanking}>
                            <option value="" disabled selected>  Chọn Ngân Hàng</option>
                            <option value="BIDV">  BIDV</option>
                            <option value="TP_Bank" >  TP Bank</option></select>
                        <input type="text" name="accountName" placeholder="Tên chủ tài khoản" className="w-44  h-6 border-2 border-gray-400 rounded-md" required={methodBanking}/>
                        <input type="text" name="bankAccountNumber" placeholder="Số Tài khoản" className="w-44  h-6 border-2 border-gray-400 rounded-md" required={methodBanking} /></div></div>
                <div className="h-96  "></div>
                {/* dùng để dãn dòng */}

                <div className='bg-red-100 w-full fixed h-18 bottom-0 left-0 flex p-3 justify-end '>
                    <button type="submit" className=' text-white text-lg font-semibold text-center bg-orange-400 w-32 h-10 rounded-md md:mr-8'>Xác Nhận</button> </div></form>
  </main>  )
}
export default Payment;