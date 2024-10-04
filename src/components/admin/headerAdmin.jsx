import React, { useEffect, useState } from "react";
import SiderUser from '../siderUser'
import Cookies from 'js-cookie';
import { useNavigate } from "react-router-dom";

const HeaderAdmin =()=>{

    var Code=''
    const [code,setCode]= useState('')
    const [ser,setUser]= useState({})
    const [rights,setRight]=useState([])
   
    const navigate =useNavigate()

    const checkRights= (ser)=>{
      
        if(ser.type==="contentAdmin"){
            
            const tabRight = document.querySelector('#right-tab')
            
           
            
            const tabaddAdmin = document.querySelector("#addAdmin-tab")
            

            const tabManageUser = document.querySelector('#manageUser-tab')

            const contentRight = document.querySelector('#right')

            const contentA = document.querySelector("#addAdmin")

            const contentU = document.querySelector("#manageUser")

            if(tabRight,tabaddAdmin,tabManageUser,contentA,contentRight,contentU){
                const ParentA = tabaddAdmin.parentElement
                const ParentRight = tabRight.parentElement
                tabRight.classList.remove("active")
                ParentRight.classList.add("hidden")
                contentRight.classList.add("hidden")
                contentRight.classList.remove("show")
                contentRight.classList.remove("active")
                

                ParentA.classList.add("hidden")
                contentA.classList.add("hidden")


                tabManageUser.classList.add("active")
                contentU.classList.add("active")
                contentU.classList.add("show")
                
            }


            rights.forEach(right=>{
               
                const RButton=document.querySelectorAll(`[data-right="${right.id}"]`)
                if(right.status === true &&RButton){
                    RButton.forEach(Button=>{
                    if(Button.classList.contains("hidden")){
                    Button.classList.remove('hidden')}})
    
                    
                }
                else if(right.status === false &&RButton){
                    RButton.forEach(Button=>{
                        Button.classList.add("hidden")})
                }
            })
    }
    else{
        console.log("sai")
    }
    }

useEffect(()=>{
 
    Code = Cookies.get('code')
const main =async()=>{

   try {
    const rres=await fetch ('/api/users') 
    if(!rres.ok){
        throw new Error ("Not responding")
    }
    const users = await rres.json()
    const User = users.find(item=>item.code===Code)
    if(User){
        if(User && User.type!=="contentAdmin" && User.type!=="admin"){
        navigate('/')
    }
       setCode(Code)
      setUser(User)
      
       
    

    }

    

    if(User.type==="contentAdmin"){
        checkRights(User)
        console.log("vào đây",rights)
        try{
            const resp = await fetch(`/api/rights`)
            if(!resp.ok){
                throw new Error("not responding")
            }
            const right = await resp.json()
            setRight(right)

        }
        catch(err){
            console.error(err)
        }

        
    }
 
    else {
        console.log("ad")
    }

  
} 
    catch(err){
        console.error(err)}
    }



main()


},[])
  
useEffect(() => {
    console.log("User updated:", ser);
  

    checkRights(ser)
     // Theo dõi khi ser thay đổi
}, [ser,rights]);

console.log("ngoai",ser)



 
const siderU = (id)=>{
    const siderUser = document.getElementById(id)
    siderUser.classList.toggle('hidden')
}
  
const goBack = ()=>{
    window.history.back()
}
    return(
        

    <nav className='bg-orange-600 text-white text-lg md:text-xl p-2 fixed top-0 w-full z-50 h-20'>
        <div className='flex items-center justify-start w-full'>
            <i className="fas fa-arrow-left ml-4 mt-6 w-12 h-12 z-7" onClick={()=>{goBack()}}></i>
            <i className="fas fa-user-circle mt-6 ml-auto w-12 h-12 z-7" onClick={()=>{siderU('user-sider')}}></i>
           
            
            </div> 
            <SiderUser  user={ser}/>
            </nav>

    )
}
export default HeaderAdmin;