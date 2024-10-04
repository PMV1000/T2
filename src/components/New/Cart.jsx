import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { setCart,setDataProductsCart,setSelectProduct,addToCart,removeFormCar } from '../../reducers/client/cart';

function Cart() {
    const dispatch=useDispatch()
  const {dataCartProduct,cart,selectProduct} = useSelector(state=>state.cart)
  const user =useSelector(state=>state.user)
  const products = useSelector(state=>state.products.products);
  const [total, setTotal] = useState(0);
  const [id,setId] = useState('')

  const location = useLocation()
  const Navigate = useNavigate()


 

  const addTocart= async (Id,quan,type='')=>{
    quan=parseInt(quan,10)
    if(cart){
        const actionPayload = { productId: Id, quantity: quan}
        dispatch(addToCart(actionPayload))
  await fetch (`/api/carts/${user.id}`,{
      method:"PUT",
      headers:{
        "content-Type":"application/json",
      },
      body:JSON.stringify(cart)
    })
    Navigate('/cart')

    }

   
 

  }

  const RemoveFromCart = async (id)=>{
    
    dispatch(removeFormCar(id))

    await fetch(`/api/carts/${user.id}`,{
      method:"PUT",headers:{"content-Type":"application/json"},
      body:JSON.stringify(cart)
    })
  }
 



  useEffect(() => {
    const fetchCart = async () => {
      try {
        const resp = await fetch(`/api/carts/${user.id}`);
        if (!resp.ok) {
          throw new Error("Network response wasn't ok");
        }
        const data1 = await resp.json();
        dispatch(setCart(data1));
      } catch (err) {
        console.error(err);
        
      }
    };
 

  
      
// 
    
    fetchCart();
  }, [dispatch]);

  useEffect(() => {
    const fetchData = async () => {
      if (cart && cart.products.length > 0) {
        try {
          const promises = cart.products.map(item => {
            const info = products.find(pro => pro.id === item.productId + '');
            return [info, item.quantity];
          });

          const updateData = await Promise.all(promises);
          dispatch(setDataProductsCart(updateData));
        } catch (err) {
          console.error('Error:', err);
        }
      }
    };

    fetchData();
  }, [dispatch]);

  useEffect(() => {
    const computeTotal = () => {
      const totalPrice = dataCartProduct.reduce((total, item) => {
        if (item[0]) {
          return total + (item[0].price * (1 - item[0].discount) * item[1]);
        }
        return total;
      }, 0);
      setTotal(totalPrice);
    };

    computeTotal();
    
    const quantity = location.state?.Quantity || 1
    const Id = location.state?.ProductId|| '' 
    setId(Id)
  if(id!== null&& (id.length>0||id.isNaN)){
    addTocart(id,quantity)
    
  
  
   
  }
  }, [dataCartProduct,location.state]);




  const btnclick = (id) => {
    const remove = document.getElementById(id);
    remove.classList.toggle('hidden');
   
  
  }; 

  // const blur = (id)=>{document.addEventListener('click',()=>{
  //   const btn = document.getElementById(id)
  //   if(btn.classList.contains('hidden')){
  //     btn.classList.add('hidden')
  //   }})}
  const tick = (id,type=null) => {
    const tickAllElement = document.getElementById(`tick#`);
    const untickAllElement = document.getElementById(`untick#`);
    const tickElement = document.getElementById(`tick${id}`);
    const untickElement = document.getElementById(`untick${id}`);
   const RM = document.querySelector('#RMALL')
    if(type){
      if(type==="tick"){
        tickElement.classList.remove('hidden');
        if(RM.classList.contains("hidden")){
          RM.classList.remove('hidden')
          untickAllElement.classList.remove("hidden")
        }
        
        
        untickElement.classList.add('hidden');

        (setSelectProduct(selectProduct=>[...selectProduct,{id:id,quantity:tickElement.getAttribute('data-quantity')}]))
      }
      }
   else{
    if (tickElement.classList.contains('hidden')) {
      tickElement.classList.remove('hidden');
      untickElement.classList.add("hidden")
      if(RM.classList.contains("hidden")){
        RM.classList.remove('hidden')
        untickAllElement.classList.remove("hidden")
      }

     
      (setSelectProduct(selectProduct=>[...selectProduct,{id:id,quantity:tickElement.getAttribute('data-quantity')}]))
      
    

    } else {
      untickElement.classList.remove('hidden');
      tickElement.classList.add('hidden'); 
      if(!tickAllElement.classList.contains("hidden")){
        tickAllElement.classList.add("hidden")
        untickAllElement.classList.remove("hidden")
      }

        
       (setSelectProduct(selectProduct=>selectProduct.filter(item=>item.id===id)))
    
    }
   }
    
   if(dataCartProduct.every(pro=>{
    const button = document.querySelector(`#tick${pro[0].id}`)
    return (button.classList.contains("hidden"))
   })){
    RM.classList.add('hidden')
    untickAllElement.classList.add('hidden');
   
   }

   if(dataCartProduct.every(pro=>{
    const button = document.querySelector(`#tick${pro[0].id}`)
    return (!button.classList.contains("hidden"))
   })){

    tickAllElement.classList.remove("hidden")
    untickAllElement.classList.add('hidden');
   
   }
  
  

   
   
   

   };

  const tickAll = async () => {
    
    const tickElement = document.getElementById(`tick#`);
    const untickElement = document.getElementById(`untick#`);
   const RM = document.querySelector('#RMALL')

      if (tickElement.classList.contains('hidden')) {
        tickElement.classList.remove('hidden');
        RM.classList.remove('hidden')
        untickElement.classList.add('hidden');

        dataCartProduct.forEach(item=>{tick(item[0].id,"tick")})
      
        const data = await  Promise.all( dataCartProduct.map(Pro=>{return [Pro[0].id,Pro[1]]} ))
        (setSelectProduct(data))
      } else {
        untickElement.classList.remove('hidden');
        tickElement.classList.add('hidden'); 
        dataCartProduct.forEach(item=>{tick(item[0].id)})
        //  RM.classList.add('hidden')

         
         
      }
  
      
   
      
   };
   
 const payment = ()=>{
  if(selectProduct&&selectProduct.length>0){
  Navigate('/payment',{
    state:{
      formcart:true,
      selectedProduct:selectProduct
    }
  })}
 }

 const removeAll = ()=>{
  selectProduct.forEach(pro=>{
    RemoveFromCart(pro.id)
  })
 }

 const btnBlur = (id)=>{
  const Ele =document.getElementById(id);
      Ele.classList.add('hidden')
    
  }
  return (
    <div className='mt-52'>
      {Array.isArray(dataCartProduct) && dataCartProduct.length > 0 ? (
        dataCartProduct.map((item, index) => (
          item[0] && (
            <div key={item[0].id} className='relative w-auto h-48  p-3 flex items-center shadow-md my-16 md:mx-10'>
              <div className="flex items-start h-full md:mr-16 mr-10 md:ml-4 ">
                <input type="checkbox" className="hidden" />
                <label htmlFor="multi-select" className="flex items-center cursor-pointer relative">
                  <div className="w-6 h-6  flex items-center justify-center rounded-md hidden" onClick={() =>tick(item[0].id)}  id={`tick${item[0].id}`} data-quantity={item[1]}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">

                    <rect width="24" height="24" fill="#F97316"  rx="4" ry="4"/>


                    <path d="M6 12l4 4 8-8" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg> </div>
                <div id={`untick${item[0].id}`} onClick={() =>tick(item[0].id)}> <svg
                  width="21"
                  height="21"
                  viewBox="0 0 21 21"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{ position: 'absolute', top: 0, left: 0 }}
                    >
                      <rect
                        width="21"
                        height="21"
                        fill="transparent"
                        stroke="#F97316"
                        strokeWidth="4"
                        rx="4"
                        ry="4"
                      />
                      <path
                        d="M6 12l4 4 8-8"
                        stroke="#D1D5DB"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>


                  </div>
                </label>
      </div>

              <img className='border border-gray-300 border-red-200 mt-2 h-44 w-44' src={item[0].image} alt={item[0].name} />
              <div className='justify-center w-1/2 h-36 md:ml-40'>
                <h2 className='ml-6 mb-2 w-full text-2xl h-12 z-1 bg-transparent'>{item[0].name}</h2>
                <p className='h-8 text-lg text-red-400 font-semibold ml-12'>{(item[0].price * (1 - item[0].discount)).toFixed(2)} $</p>
                <input
                 
                  type="number"
                  placeholder={item[1]}
                  min={parseInt(item[1],10)+1}
                  step="1"
                  max='99'
                  onChange={(e)=>addTocart(item[0].id,e.target.value,'change')}
                  className='border-2 text-center w-28 md:w-48 md:mx-4 mx-8 border-gray-500'
                />
              </div>
              <div className='h-full ml-1'>
                <button onClick={() => btnclick(item[0].id + '')}   >
                  <i className="fa-solid fa-ellipsis text-gray-500 mr-2 md:ml-80 "></i>
                </button>
                <div className="absolute top-8 h-16 w-24 shadow-xl z-6 right-1 p-1 hidden" id={item[0].id + ''} onMouseLeave={()=>{btnBlur(item[0].id + '')}}>
                  <button className='items-center border-b-2 text-xs justify-center mt-2 p-1' onClick={()=>{RemoveFromCart(item[0].id)}}>Xóa khỏi giỏ hàng</button>
                </div>
              </div>
            </div>
          )
        ))
      ) : (
        <p className='w-full mt-8 mr-8 flex justify-center text-gray-600 text-lg'>Không có sản phẩm nào trong giỏ hàng</p>
      )}
      <div className="bg-red-50 h-24 shadow-2xl w-full z-6 left-0 mx-2 fixed bottom-0 flex justify-end">
        <div>
          <p className='text-2xl text-orange-600 font-normal mt-1 mr-6'>Tổng Thành Tiền: {total.toFixed(2)} $</p>
          <button className='text-yellow-50 text-lg bg-yellow-400 p-1 w-28 h-1/20 rounded-md mb-2 ml-16' onClick={payment}>Thanh Toán</button>
        </div>
      </div>
            <div className="flex items-center fixed top-16 md:px-4  px-1 left-0 w-full bg-white shadow h-16">
              <input type="checkbox" className="hidden" id= "multi-select"/>
              <label htmlFor="multi-select" className="flex items-center cursor-pointer relative">
                <div className="w-6 h-6 ml-2 mt-3  flex items-center justify-center rounded-md hidden" id="tick#"  onClick={() =>tickAll()} >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">

                  <rect width="24" height="24" fill="#F97316"  rx="4" ry="4"/>


                  <path d="M6 12l4 4 8-8" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg> </div>
              <div id="untick#" onClick={() =>tickAll()}  className="mr-2 w-40 mt-3 hidden"> <svg
                width="21"
                height="21"
                viewBox="0 0 21 21"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{ position: 'absolute', top: 20, left: 0 }}
                  >
                    <rect
                      width="21"
                      height="21"
                      fill="transparent"
                      stroke="#F97316"
                      strokeWidth="4"
                      rx="4"
                      ry="4"
                    />
                    <path
                      d="M6 12l4 4 8-8"
                      stroke="#D1D5DB"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>

                  <span className="text-gray-500 text-lg ml-8 w-full "> Chọn Tất Cả</span>
                        </div>
                      </label> 
                      

                      <div className=" w-2/3 flex mt-4 md:w-5/6 ml-6 justify-end items-center text-red-600 font-light text-sm">
                        <button id="RMALL" className="hidden" onClick={()=>{removeAll()}}> Xóa Khỏi Giỏ Hàng </button>
                      </div>
      </div>

    </div>
  );
}

export default Cart;
