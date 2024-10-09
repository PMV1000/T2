import React, { useState } from "react";
import Cookies from 'js-cookie';
import {  useNavigate } from "react-router-dom";
const SiderUser= (user) =>{
    const navigate = useNavigate()

    
    const [userName, setUsername]=useState('')
    const [email,setemail]=useState('')
    const [WrongPW,setWrong]=useState(false)
    const [NewPW,setNewPW]=useState('')
    const [OldPW,setOldPW]=useState('')
    // const [user,SetUser]= useState({})
    // const [code,setCode]= useState('')

    // const main =async()=>{
    //     const Code = Cookies.get('code')
    //     const rres=await fetch ('/api/users') 
    //     const users = await rres.json()
    //     const User = users.find(item=>item.code===Code)
    //     if(User){
    //       SetUser(User)
    //       setCode(Code)
    //       console.log(user)
    
    //     }
        
    
       
    // }

    const FormEdit = (e=null,id)=>{
        e.preventDefault()
        const siderUser = document.getElementById(id)
        siderUser.classList.toggle('hidden')
    }

const logout = async()=>{
    Cookies.remove('code')
    const siderUser = document.getElementById("user-sider")

    siderUser.classList.toggle('hidden')
    const newU = {...user.user,code:null}
    await fetch (`/api/users/${user.user.id}`,{method:"PUT", 
        headers:{"content-Type":"application/json"},
        body: JSON.stringify(newU)
    })
    navigate('/login')
    window.location.reload()

}

 
const changemail = (e)=>{
    e.preventDefault()
    const EM = e.target.value
    setemail(EM)
}   

const changeUserName = (e)=>{
    e.preventDefault()
    const UN = e.target.value
    setUsername(UN)
}

const submit = async (e)=>{
    e.preventDefault()
    
    if(email && userName){console.log(`/api/users/${user.user.id}` )
        const newU = {...user.user,email:email,username:userName}
        await fetch (`/api/users/${user.user.id}`,{method:"PUT", 
            headers:{"Content-Type":"application/json"},
            body: JSON.stringify(newU)
        })
        console.log(newU,"ii")
        window.location.reload();
    }
    else{
        if(email){
            const newU = {...user.user,email:email}
            await fetch (`/api/users/${user.user.id}`,{method:"PUT", 
                headers:{"content-Type":"application/json"},
                body: JSON.stringify(newU)
            })
            console.log(newU,"ii")
            window.location.reload();
            
        }
        else if(userName){
            const newU ={...user.user,username:userName}
            await fetch (`/api/users/${user.user.id}`,{method:"PUT", 
                headers:{"content-Type":"application/json"},
                body: JSON.stringify(newU)
            })
            console.log(newU,"ii")
            window.location.reload();
        }
    }

    FormEdit(e,"editF")
    
}


 
const changeoldPW = (e)=>{
    e.preventDefault()
    const OLD = e.target.value
    setOldPW(OLD)
}   

const changnewPW = (e)=>{
    e.preventDefault()
    const NEW = e.target.value
    setNewPW(NEW)
}   

const submitPW= async (e)=>{
    e.preventDefault()
    if(OldPW&&NewPW){
        if(OldPW=== user.user.password){
            const newU ={...user.user,password:NewPW}
            await fetch (`/api/users/${user.user.id}`,{method:"PUT", 
                headers:{"content-Type":"application/json"},
                body: JSON.stringify(newU)
            })
            window.location.reload();
        }

        else{
            setWrong(true)

        }
}
}

    return (
  <sider className='bg-orange-500 border-orange-600 boder-5 fixed top-16 right-0 h-full py-8 px-4 w-56 z-5 toggle-content text-white text-lg hidden'  id="user-sider">
                <div className=" h-full w-full">
                <div className='flex items-center justify-end '> {user.user.username}
                        <i className="fas fa-user-circle mt-1 ml-2 z-7"></i></div>
                    <div className="mt-12 space-y-4 relative ">
                        <hr className="h-full text-orange-200 my-1"/>
                        <button className="p-1 hover:bg-orange-400 w-full" onClick={(e)=>FormEdit(e,"EditUInfo")}>Thông Tin Cá Nhân</button> 
                        <div className="absolute bg-yellow-50 top-12 right-32 z-10 h-48 w-56 text-gray-600 text-lg space-y-2 py-2 shadow hidden ml-2" id="EditUInfo">
                            <i className="fas fa-pen ml-48 relative" onClick={(e)=>FormEdit(e,"editF")}></i>
                                <form className="absolute shadow bg-white top-12 h-48 w-44 hidden " id="editF" onSubmit={(e)=>submit(e)}>
                                  <div className="w-5/6 mt-2 flex justify-end">
                                    <button>
                                      <i className="fas fa-times" onClick={(e)=>FormEdit(e,"editF")}></i></button></div>
                                  <input className="border-2 border-gray-300 rounded-md w-2/3 ml-4 mt-6 h-6 p-2 text-sm-gray-500 " autocomplete="on" onChange={changeUserName}   placeholder={user.user.username} />
                                  <input className="border-2 border-gray-300 rounded-md w-2/3 ml-4  mt-2 md:mt-3 h-6 p-2 text-sm text-gray-500 " onChange={changemail} type="email"  autocomplete="on" placeholder={user.user.email}/>
                                  <button  type="submit" className="text-orange-400 h-9 p-1 border-2 border-orange-400 rounded-md w-18 ml-8 mt-4"> chỉnh sửa</button></form>
                            <p className="text-lg"> userName: {user.user.username} </p>  
                            <p >email : {user.user.email}</p></div>
                               
                        <hr className="h-full text-orange-200 my-1"/>
                        <button className="p-1 hover:bg-orange-400 w-full flex justfy-start ml-2 relative" onClick={(e)=>FormEdit(e,"editPW")}> Đổi Mật Khẩu</button>
                        <form className="absolute shadow bg-white top-28 right-8 h-48 w-52 hidden " id="editPW" onSubmit={(e)=>submitPW(e)}>
                                  <div className="w-full h-8  mb-2  flex justify-end">
                            
                                    <button>
                                      <i className="fas fa-times mr-5 text-gray-600" onClick={(e)=>FormEdit(e,"editPW")}></i></button></div>
                                  <input className="border-2 border-gray-300 rounded-md w-4/5  ml-4  h-7 text-sm text-gray-500 " onChange={changeoldPW}   placeholder="Mật Khẩu Cũ" />
                                  <p className={(WrongPW)?"w-full text-center text-sm font-semibold text-red-700 m-0 h-4":"hidden"}> Sai Mật Khẩu </p>
                                  <input className="border-2 border-gray-300 rounded-md w-4/5  ml-4  mt-2 text-sm  h-7 text-gray-500 " onChange={changnewPW} type="password"  autocomplete="on" placeholder="Mật Khẩu Mới"/>
                                  <button  type="submit" className="text-orange-400 h-9 p-1 border-2 border-orange-400 rounded-md w-18 ml-10 mt-4"> Đổi Mật Khẩu</button></form>
                        <hr className="h-full text-orange-200 my-1 "/>
                        <button className="p-1 hover:bg-orange-400 w-full flex justfy-start ml-2" onClick={()=>logout()}>Logout</button> 
                        <hr className="h-full text-orange-200 my-1"/></div></div></sider>
    )
}
export default SiderUser;