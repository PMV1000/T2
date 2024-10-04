import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import cryptoRandomString from 'crypto-random-string';
import Cookies from 'js-cookie';
import Note from './note'
import { setUser } from "../../action/client/header";
const Template=({type})=>{
    const dispatch = useDispatch();

    const navigate = useNavigate()
    const [existError,setErrorExist]=useState('')
    const [userName, setUsername]= useState('')
    const [pass, setpass]= useState('')
    const [email, setemail]= useState('')
    const [CODE, setcode]= useState('')
    
useEffect(
    ()=>{
const goHome = async ()=>{
    try{
    const Code = Cookies.get('code')
    const rres=await fetch ('/api/users')
    if(!rres.ok){
        throw new Error("Not Responding")
    } 
    const users = await rres.json()
    const User = users.find(item=>item.code===Code)
    if(User){
        dispatch(setUser(User))
    //     if(User.type==="admin"||User.type==="contentAdmin"){
    //        navigate('/admin',
    //         {state:{
    //        user: User
    //     }
    //        }
    //     )
    //     }
    //  else{
       navigate('/')

    }}

    catch(err){
        console.error(err)
    }
}

goHome()


},[CODE]
)
    const changeUserName = (e)=>{
        const UN = e.target.value
        setUsername(UN)
}
    const changepass = (e)=>{
        const PW = e.target.value
        setpass(PW)
}   
    const changemail = (e)=>{
        const EM = e.target.value
        setemail(EM)
}   
    const submit= async (e,type) =>{
        e.preventDefault()
        const check = userName.includes('@') && (userName.endsWith(".com") || userName.endsWith(".vn"))
        var exist = ''
       
        const response = await fetch('/api/users');
        const user = await response.json()
      
        if(type==="login"){
            if(check&&!email){
                        exist =  user.find(item=>item.email===userName&&item.password===pass)
                    }
                    else{
                        exist =  user.find(item=>item.username===userName&&item.password===pass)
                    }
            if(exist){
                console.log("đúng rồi")
                const code = cryptoRandomString({length:32, type:'alphanumeric'})
                Cookies.set("code",code,{expires:0.04})
                const Newdata = {...exist,code:code}
                await fetch(`/api/users/${exist.id}`,{
                    method:"PUT", 
                    headers:{"content-Type":"application/json"},
                    body:JSON.stringify(Newdata)
                })
                console.log(code)
                setcode(code)
            }
            else{
                if(user.find(item=>item.password===pass)){
                setErrorExist("Tên đăng nhập hoặc email không đúng ")}
                else{
                    setErrorExist("Sai Mật Khẩu")
                }
            }
        }
        else if (type==="signup"){
             if(user.find(item=>item.email===email)){
                setErrorExist("email đã tồn tại")
            }
           else if(user.find(item=>item.username===userName)){
            setErrorExist("tên đăng nhập đã tồn tại")
            }
            else{
                const code = cryptoRandomString({length:32, type:'alphanumeric'})
                Cookies.set("code",code,{expires:0.04})
                const NewUser = {id:cryptoRandomString({length:32, type:'numeric'}),username:userName,email:email,password:pass,code:code}
                await fetch(`/api/users`,{
                    method:"POST", 
                    headers:{"content-Type":"application/json"},
                    body:JSON.stringify(NewUser)
                })
                console.log(code,"Đây")
                setcode(code)
            }
            
        }

    
        window.location.reload()
       
    }
    return (
        <main className="w-full h-auto p-4 mt-20">
            <Note/>
            <div className={existError?" border-1 border-orange-400 text-orange-600 bg-orange-100 font-semibold text-xl py-4 text-center w-full h-16 mb-8":"hidden"}> {existError}</div>
            <a href="/" className="text-orange-500 ">
                <i className="fas fa-arrow-left m-4"/></a>
            <div className="rounded-lg w-80 md:w-2/5 h-88 md:h-2/3 bg-white shadow  mx-auto my-8">
                <form className="p-3"onSubmit={(e)=>submit(e,type)} >
                    <h1  className="text-orange-300 font-bold md:text-2xl text-xl w-full text-center"> {type==="login"? 'Đăng Nhập' : 'Đăng Kí'} </h1>
                    <input onChange={changeUserName} className="border-2 border-gray-300 rounded-md w-2/3 ml-12 md:ml-20 mt-6 h-6 p-2 text-lg text-gray-500 "  autoComplete="on" required placeholder="UserName"/> 
                    <input onChange={changepass} className="border-2 border-gray-300 rounded-md w-2/3 ml-12 md:ml-20  mt-2 md:mt-3 h-6 p-2 text-lg text-gray-500 "  type="password"  required placeholder="Password"/>
                    <input onChange={changemail} className={(type === "login")?'hidden ':"border-2 border-gray-300 rounded-md w-2/3 ml-12 md:ml-20  mt-2 md:mt-3 h-6 p-2 text-lg text-gray-500 "} type="email"  autoComplete="on"  required={(type==="login")?false:true} placeholder="Email"/>
                    <hr  className="mt-4 md:mt-6 text-red-300 w-full"/>
                    <label  htmlFor="goole" className=" w-full h-2 md:mt-4 text-center mr-4 md:text-lg text-md text-orange-400 md:font-medium"> Hoặc </label>
                    <a href="#" className=" no-underline  text-center border-2 border-gray-500 rounded-md w-3/4 ml-10 md:ml-16 flex md:mt-10  mt-6 md:mb-3 md:mt-3 md:h-10 h-8  text-md text-gray-700 "  >  
                        <img  className="md:h-9 h-7 w-10 bg-transparent" src="/image/google.webp"/>
                        <span  className="text-sm w-3/4 mt-1 md:font-medium  " >{type==="login"?'Đăng Nhập':'Tiếp Tục'} Với Google</span> </a>
                    <a  href="#" className=" no-underline  border-2 border-gray-500 rounded-md w-3/4 ml-10 md:ml-16 flex  mt-2  md:h-10 h-8  text-md text-gray-700 "  > 
                        <img  className="h-7 md:h-9 w-10 bg-transparent" src="/image/facebook.webp"/>
                        <span className="text-sm md:w-3/4 mt-1 md:font-medium  text-center ">{type==="login"?'Đăng Nhập':'Tiếp Tục'} Với Facebook</span></a>
                    <button  type="submit" className="text-xl ml-40 text-white bg-orange-500 rounded-md p-1 font-medium h-9 w-40 mt-4">Đăng{type==="login" ? "Nhập" : "Kí"}</button>
                    <span className="w-full flex justify-center text-sm md:text-lg flex mt-4 ">{type==="login"?'Chưa':'Đã'} có tài khoản?
                      <a href=  {type==="login" ?'/signup' : '/login'} className="text-orange-500 font-semibold ml-1 " >  Đăng {type==="login" ?'Kí':'Nhập'}</a> </span></form></div>
        </main>
    )
}
export default Template;