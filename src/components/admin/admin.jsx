import React, { useEffect, useState } from "react";
import cryptoRandomString from 'crypto-random-string';
import { useLocation, useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import HeaderAdmin from'./headerAdmin'
import { useDispatch, useSelector } from "react-redux";
import { setUsers,removeAcc,addAdminAcc } from "../../action/users";
const Admin = ()=>{
    const [existAccountAdmind,setexist]=useState(true)
    const [existError,setErrorExist]=useState('')
    const [AccountAdmindName,setName]=useState('')
    const [AccountAdmindEmail,setEmail]=useState('')
    const [AccountAdmindPassWord,setpassword]=useState('')
    const [AccountAdmindId,setId]=useState('')
    const [id,setRMid]=useState('')
    const users=useSelector(state=>state.users.users)
    const rights=useSelector(state=>state.rights.rights)
    const navigate= useNavigate()
    const location = useLocation()
    const dispatch = useDispatch()
 
//ở đây có thể fetch riêng trong file vì chỉ có tab manageUser trong page là sử dụng 
    useEffect(()=>{
        const fetchU = async ()=>{
            try{
        const response = await fetch('/api/users')
        const Users = await response.json()
        
        if(!response){
            throw new Error("Not Response")
        } 

        dispatch(setUsers(Users))
    
    }
        catch (err){
            console.error('Fetch Data Error')

        }

      
       
    }

    
     fetchU()

     

    },[])

    const changeAApassword =(e)=>{
        e.preventDefault()
        setpassword(e.target.value)
    }
    const changeAAemail =(e)=>{
        e.preventDefault()
        setEmail(e.target.value)
    }
    const changeAAname =(e)=>{
        e.preventDefault()
        setName(e.target.value)
    }
   
    const changeAAId =(e)=>{
        e.preventDefault()
        setId(e.target.value)
    }

    const addAdmin =async (e)=>{
        e.preventDefault()
        if(AccountAdmindPassWord&&AccountAdmindEmail&&AccountAdmindName){
          

            if(users.find(item=>(item.username===AccountAdmindName))){
                console.log("vào đâyy")
                setErrorExist("Tên Tài Khoản Đã Tồn Tại")
                setTimeout(()=>{setErrorExist('')},8000)
            }
            else if(users.find(item=>(item.email===AccountAdmindEmail))){
                setErrorExist("Email Đã Tồn Tại")
                setTimeout(()=>{setErrorExist('')},8000)
            }
            else{
                dispatch(addAdmin({username:AccountAdmindName,id:cryptoRandomString({length:32,type:"alphanumeric"}),email:AccountAdmindEmail,password:AccountAdmindPassWord,type:"contentAdmin",code:null}))
            
             await fetch (`/api/users/`,{
                method:"POST",
                headers:{"content-Type":"application/json"},
                body:JSON.stringify(users)
               
             }) 
             
              } 
            const IPE=document.getElementById('email')
             IPE.value=""
            const IPName=document.getElementById('userName')
             IPName.value=""
            const IPPassW=document.getElementById('password')
             IPPassW.value=""
             
    }
        
        else if(AccountAdmindId){
       
           const response= await fetch (`/api/users/${AccountAdmindId}`,{
            method:"PATCH",
            headers:{"content-Type":"application/json"},
            body:JSON.stringify({type:"contentAdmin"})
            
           })
           if(!response.ok){
            
            setErrorExist("Id không tồn tại")
            setTimeout(() => {
                setErrorExist('');
            }, 8000); 
            
           }
           else{window.location.reload();}
            const IPId=document.getElementById('id')
            IPId.value=""
            
        }
     
    }
// Xóa hẳn đối với User


    const RMuser=async ()=>{
        console.log("nhấn",id)
        dispatch(removeAcc(id))
        
        try {
            const response = await fetch(`/api/users/${id}`, {
                method: 'DELETE',
                headers: {
                  'content-Type': 'application/json'
                }
                // Không  gửi body 
              });
        
            if (!response.ok) {
              throw new Error('Network response was not ok.');
            }

            
            
      



    }  catch (err){}}



    // Phân quyền
    const ChangeRights = async (event,id)=>{
        const status=event.target.checked
        console.log(status)
        await fetch (`/api/rights/${id}`,{
          method:"PATCH",
          headers:{"content-Type":"application/json"},
          body: JSON.stringify({status:status})
        })
        window.location.reload()
      }

    return (<body>
        <HeaderAdmin/>
        
   
    <main className="w-full mt-36">


<div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Xác Nhận </h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
        Bạn chắc chắn muốn xóa tài khoản có id: {id} (tài khoản sẽ bị xóa vĩnh viễn và không thể khôi phục lại)
      </div>
      <div className="modal-footer">
        <button type="button" className="h-9 rounded-md w-28 border-orange-400 border-2 bg-transparent text-orange-400 ml-2" data-bs-dismiss="modal">Thoát </button>
        <button type="button" className="h-9 rounded-md w-28 border-orange-400 border-2 bg-orange-600 text-white" data-bs-dismiss="modal"  onClick={()=>{RMuser()}}>Xác Nhận </button>
      </div>
    </div>
  </div>
</div>
        <div className={existError?" border-1 border-orange-400 text-orange-600 bg-orange-100 font-semibold text-xl py-4 text-center w-full h-16 mb-8":"hidden"}> {existError}</div>
         <h1 className="text-orange-500 font-semibold text-4xl flex justify-center">Khu Vực Quản Trị Viên</h1> 
                <div className="container mt-12 h-auto w-full font-medium">
                    <ul className="nav nav-tabs md:text-xl  " id="myTab" role="tablist" >
                        <li className="nav-item w-32 md:w-60 text-center "   role="presentation">
                           <a className="nav-link  border-2 active " id="right-tab" data-bs-toggle="tab" href="#right" role="tab"aria-controls="right"aria-selected="true"> Phân Quyền</a></li>
                        <li className="nav-item w-32 md:w-60 text-center "   role="presentation">
                           <a className="nav-link border-2 " id="addAdmin-tab" data-bs-toggle="tab" href="#addAdmin" role="tab"aria-controls="addAdmin"aria-selected="true"> Thêm Quản Trị Viên</a></li>
                        <li className="nav-item w-32 md:w-60 text-center" role="presentation">
                           <a className="nav-link  border-2" id="manageUser-tab" data-bs-toggle="tab" href="#manageUser" role="tab"aria-controls="manageUser"aria-selected="false"> Quản Lí Người Dùng </a></li>
                        <li className="nav-item w-32 md:w-60 text-center" role="presentation">
                           <a className="nav-link border-2" href="/manageCategory" role="tab"aria-controls="manageCategory"aria-selected="false">Danh Mục Sản Phẩm</a> </li>
                        <li className="nav-item w-32 md:w-60 text-center" role="presentation">
                           <a className="nav-link border-2" href="/manageProduct" role="tab"aria-controls="manageProduct"aria-selected="false"> Sản Phẩm</a></li></ul>
                    <div className="tab-content md:p-20 px-2 py-8" id="myTabContent">
                        <div className="tab-pane fade show active " id="right" role="tabpanel"aria-labelledby="right-tab">
                            <h3 className="text-orange-400 text-2xl text-center w-full"> Phân Quyền</h3>
                                {(rights.length !== 0)?(
                            <table className="md:mt-20 m-8  md:text-xl  w-full md:ml-36">
                                <thead className="h-20">
                                    <tr className="h-8">
                                        <th className="w-3/5"> Nhóm Quyền</th>
                                        <th>Quản Lí Nội Dung</th> </tr></thead>
                               <tbody>
                                    <tr className="font-medium h-12" >
                                        <td colspan="2">Quyền Tài Khoản</td>  </tr>
                                    <tr className="font-normal">
                                        <td> Xóa Tài Khoản Người Dùng</td>
                                        <td className="text-start" >
                                           <input type="checkbox" checked={rights[0].status} className="ml-20  checkboxRight" onChange={(e)=>ChangeRights(e,"deleteUserAccount")}/></td></tr>
                                    <tr className="font-medium h-12" >
                                        <td colspan="2" >Quyền Danh Mục Sản Phẩm </td> </tr>
                                    <tr className="font-normal">
                                        <td> Thêm Danh Mục Sản Phẩm</td>
                                       <td className="text-start">
                                           <input type="checkbox" checked={rights[1].status} className="ml-20  checkboxRight" onChange={(e)=>ChangeRights(e,"addProductCategory")} /></td> </tr>
                                    <tr className="font-normal">
                                        <td >Sửa Danh Mục Sản Phẩm</td>
                                       <td className="text-start"> 
                                           <input type="checkbox" checked={rights[2].status} className="ml-20  checkboxRight"  onChange={(e)=>ChangeRights(e,"editProductCategory")}/></td></tr>
                                    <tr className="font-normal">
                                        <td> Xóa Danh Mục Sản Phẩm</td>
                                        <td className="text-start" >
                                           <input type="checkbox" checked={rights[3].status} className="ml-20  checkboxRight" onChange={(e)=>ChangeRights(e,"deleteProductCategory")}/></td> </tr>

                                    <tr className="font-medium h-12" >
                                        <td colspan="2">Quyền Sản Phẩm</td>  </tr>
                                    <tr className="font-normal">
                                        <td> Thêm Sản Phẩm</td>
                                        <td className="text-start" > 
                                           <input type="checkbox" checked={rights[4].status} className="ml-20  checkboxRight"  onChange={(e)=>ChangeRights(e,"addProduct")}/></td></tr>
                                    <tr className="font-normal">
                                        <td> Sửa Sản Phẩm</td>
                                       <td className="text-start">
                                           <input type="checkbox" checked={rights[5].status} className="ml-20  checkboxRight"  onChange={(e)=>ChangeRights(e,"editProduct")}/></td> </tr>
                                    <tr className="font-normal">
                                        <td>Xóa Sản Phẩm</td> 
                                        <td className="text-start"> 
                                           <input type="checkbox" checked={rights[6].status} className="ml-20  checkboxRight" onChange={(e)=>ChangeRights(e,"deleteProduct")}/></td></tr></tbody></table>):(<p>Chưa nhận được thông tin về các nhóm quyền</p>)}</div>
                        <div className="tab-pane fade  " id="addAdmin" role="tabpanel" aria-labelledby="addAdmin-tab">
                            <h3 className="text-orange-400 text-2xl text-center w-full"> Thêm Quản trị Viên</h3>
                            <form className="mt-12 w-2/3 md:ml-80  " onSubmit={addAdmin}>
                            <div className="text-center w-2/3">
                            <input className={!existAccountAdmind?"hidden":"border-2 border-gray-300 rounded-md w-40 ml-32 md:ml-16 h-6 p-2 text-lg text-gray-500 "} onChange={changeAAId}  autoComplete="on" required={existAccountAdmind} placeholder="Id" id='id'/></div>
                               <input className={existAccountAdmind?"hidden":"border-2 border-gray-300 rounded-md w-48 ml-28 md:ml-10 mt-6 h-6 p-2 text-lg text-gray-500 "} onChange={changeAAname}  autoComplete="on" required={!existAccountAdmind} placeholder="UserName" id="userName"/>
                               
                               <input className={existAccountAdmind?"hidden":"border-2 border-gray-300 rounded-md w-48 ml-28 md:ml-10 mt-6 h-6 p-2 text-lg text-gray-500 "} onChange={changeAAemail}    autoComplete="on" required={!existAccountAdmind} placeholder="Email" id="email"/>
                               <input className={existAccountAdmind?"hidden":"border-2 border-gray-300 rounded-md w-48 ml-28 md:ml-10 mt-6 h-6 p-2 text-lg text-gray-500 "} onChange={changeAApassword}  placeholder="password" required={!existAccountAdmind} id="password"/>
                                <button  type="submit" className="bg-orange-400 text-white h-9 p-1  rounded-md w-32 md:ml-64 ml-32 mt-8"> Thêm</button>
                                <button className="w-full ml-24 text-sm text-orange-500 font-semibold md:text-lg flex mt-4 " onClick={()=>{existAccountAdmind? setexist(false):setexist(true)}}>{existAccountAdmind?"chưa có tài khoản?":"Đã có Tài Khoản"}</button> </form></div>
                    
                        <div className="tab-pane fade " id="manageUser" role="tabpanel" aria-labelledby="manageUser-tab">
                            <h3 className="text-orange-400 text-2xl text-center w-full"> Danh Sách Người Dùng</h3>
                            <div className=" h-auto  md:px-2"> 
                                <div >
                                    <table className=" text-center border-3 border-orange-400 md:ml-10 divide-y divide-orange-400 divide-4 w-full  h-auto mt-10">
                                        <thead className="h-20">
                                            <tr className="h-20">
                                                <th className="w-16 h-auto md:p-2">Id</th>
                                                <th className=" h-auto md:p-2">Tên Tài Khoản</th>
                                                <th className=" h-auto md:p-2">Loại Tài Khoản</th>
                                                <th className="w-20 h-auto md:p-2"></th>
                                            </tr>
                                        </thead>
                                        <tbody >
                                            {users.map(user => (
                                                <tr key={user.id} className="h-auto divide-x">
                                                    <td className="w-16 h-auto p-2 break-words whitespace-normal">{user.id}</td>
                                                    <td className=" h-auto p-2 break-words">{user.username}</td>
                                                    <td className="h-auto p-2 break-words">{user.type}</td>
                                                    <td className="w-20 h-auto p-2">
                                                        <button onClick={() => { setRMid(user.id) }} data-bs-toggle="modal" data-bs-target="#exampleModal" data-right="deleteUserAccount">
                                                            <i className="fas fa-trash-alt"></i>
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
</table>
</div></div></div>
                             


                        <div className="tab-pane fade " id="manageCategory" role="tabpanel" aria-labelledby="manageCategory-tab"></div>
                        <div className="tab-pane fade" id="manageProduct" role="tabpanel" aria-labelledby="manageProduct-tab"></div></div></div>
    </main> </body>)
}

export default Admin;