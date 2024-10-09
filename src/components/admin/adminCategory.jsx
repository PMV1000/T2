import React, { useEffect, useState } from 'react';
import HeaderAdmin from'./headerAdmin'
import cryptoRandomString from 'crypto-random-string';
const ManageCategory = () => {
    const [Categories,setcat]=useState([])
    const [catName,setcatName]=useState('')
    const [supCat,setSup]=useState(null)
    const [childId,setchild]=useState('')
    const [ProId,SetProId]=useState('')
    const [error,setE]=useState(null)
    useEffect(
        ()=>{
            const fetchCat= async()=>{
                try{
                    const response = await fetch (`/api/categories`)
                    if(!response.ok){
                        throw new Error("Not Responding")
                    }
                    const Cat = await response.json()
                    const cat = Cat.filter(category=>category.deleted===false) 
                    setcat(cat)
                }
                catch(err){
                    console.error(err)
                }
            }
            fetchCat()
        },[]
    )
    const Toggle =(id)=>{
        const Toggle = document.getElementById(id)
        Toggle.classList.toggle('hidden')

    }
    const MouseOut =(id)=>{
        const Toggle = document.getElementById(id)
        if(!Toggle.classList.contains("hidden")){
        Toggle.classList.add('hidden')}

    }

    const addCat=async(e)=>{
        e.preventDefault()
        if(Categories.find(cat=>cat.name===catName)){
            setE("Danh mục này đã tồn tại")
            setTimeout(()=>{
              setE(null)
            },5000)
        }
        else{
            try{
                const id=cryptoRandomString({length:32,"type":'alphanumeric'})
            await fetch(`/api/categories`,{
                method:"POST",
                headers:{"content-Type":"application/json"},
                body:JSON.stringify({id:id,name:catName,categoryChild:null,productIds:[]})
            })
            if(supCat){
                const Sup=Categories.find(cat=>cat.id===supCat)
                await fetch(`/api/categories/${supCat}`,{
                    method:"PUT",
                    headers:{"content-Type":"application/json"},
                    body:JSON.stringify({categoryChild:Sup.categoryChild?[...Sup.categoryChild,id]:[id]})
                })
            }
        
        }

           
            catch (err){
                console.error(err)
            }
            window.location.reload()
        }
        
    }

    const RemoveCat= async (id)=>{
      await fetch (`/api/categories/${id}`,{
        method:"PUT",
        headers:{"content-Type":"application/json"},
        body:JSON.stringify({deleted:true})
      })
      window.location.reload()
    }

      const EditCat =async (e,id) =>{
        e.preventDefault()
        if(catName){
        console.log(id, ' ',catName)
        if(Categories.find(cat=>cat.name===catName)){
            setE("Danh mục này đã tồn tại")
            setTimeout(()=>{
              setE(null)
            },5000)
        }
        else{
            try{
                
            const res= await fetch(`/api/categories/${id}`,{
                method:"PATCH",
                headers:{"content-Type":"application/json"},
                body:JSON.stringify({name:catName})
            })
            console.log(res)
            
        
        }

           
            catch (err){
                console.error(err)
            }
            window.location.reload()
        }}
      }

    const  AddChild=async(e,id)=>{
      e.preventDefault()
      const OldChilds = Categories.find(cat=>cat.id===id).categoryChild
      if(OldChilds){
        if(!OldChilds.find(OldChilds.id===childId)){
          await fetch (`/api/categories/${id}`,{
            method:"PATCH",
            headers:{"content-Type":"application/json"},
            body:JSON.stringify({categoryChild:[...OldChilds,childId]})
          })
        }
        window.location.reload()
      }
      else{
        await fetch (`/api/categories/${id}`,{
          method:"PATCH",
          headers:{"content-Type":"application/json"},
          body:JSON.stringify({categoryChild:[childId]})
        })
        window.location.reload()
      }
    }
      
    const  RemoveChild=async(supId,id)=>{
      
      const OldChilds = Categories.find(cat=>cat.id===supId).categoryChild
      if(OldChilds){
        if(OldChilds.find(OldChilds.id===childId)){
          await fetch (`/api/categories/${supId}`,{
            method:"PATCH",
            headers:{"content-Type":"application/json"},
            body:JSON.stringify({categoryChild:OldChilds.filter(child=>child!==id)})
          })
        }
        window.location.reload()
      }
  
    }


    const AddProToCat = async(e,id)=>{

      
        e.preventDefault()
      try{
        const response = await fetch (`/api/products`)
        if(!response.ok){
          throw new Error ("Not Res")
        }
        const Products = await response.json
         if(Products.find(pro=>pro.id===ProId)){
          const OldPros = Categories.find(cat=>cat.id===id).productIds
          if(OldPros){
            if(!OldPros.find(OldPros.id===ProId)){
              await fetch (`/api/categories/${id}`,{
                method:"PATCH",
                headers:{"content-Type":"application/json"},
                body:JSON.stringify({productIds:[...OldPros,ProId]})
              })
            }
          }
          else{
            await fetch (`/api/categories/${id}`,{
              method:"PATCH",
              headers:{"content-Type":"application/json"},
              body:JSON.stringify({productIds:[ProId]})
            })
          }

          window.location.reload()
         }

         else {
          setE("Id sản phẩm không tồn tại")
          setTimeout(()=>{
            setE(null)
          },5000)
         }
      }
      catch (err)
      {
        console.error(err)
      }

     


      
      

    }
      
    const  RemoveProductFormCart=async(supId,id)=>{
      
      const OldPros = Categories.find(cat=>cat.id===supId).productIds
      if(OldPros){
        if(OldPros.find(OldPros.id===id)){
          await fetch (`/api/categories/${supId}`,{
            method:"PATCH",
            headers:{"content-Type":"application/json"},
            body:JSON.stringify({categoryPro:OldPros.filter(Pro=>Pro!==id)})
          })
        }

        window.location.reload()
      }
  
    }
    
    const changeCatName = (e)=>{
        e.preventDefault()
        setcatName(e.target.value)
    }
    const changeSupCat = (e)=>{
        e.preventDefault()
        setSup(e.target.value)
    }
    const changeChildId = (e)=>{
        e.preventDefault()
        setchild(e.target.value)
    }
    const changeProId = (e)=>{
        e.preventDefault()
        SetProId(e.target.value)
    }


    const reset = (id=[])=>{
        id.forEach(Id=>{
        const E= document.getElementById(Id)
        E.value=''
        })}

  return (
    <body>
      <HeaderAdmin/>
      <main className="mt-6 md:p-20 py-6 h-full w-full">
        <div role="alert" className={error?"alert alert-danger h-16":"hidden"}>
          {error}
        </div>
    
      <h3 className="text-orange-400 text-2xl mt-12 text-center w-full">
        Danh Sách Danh Mục Sản Phẩm
      </h3>
      <div className="w-full px-3 mt-12 flex justify-end relative">
        <button id="addCat" data-right="addProductCategory">
          <i className="fas fa-plus" onClick={()=>{Toggle("formAddCat") ; reset(["nameAddCat","supAddCat"])}}></i>
        </button>
        <div
          className="absolute right-10 shadow z-50 w-52 h-56 bg-white text-gray-500 p-3 hidden"
          id="formAddCat"
        >
          <div className="w-full flex justify-end bg-yellow">
            <button onClick={()=>{Toggle("formAddCat") ; reset(["nameAddCat","supAddCat"])}}>
              <i className="fas fa-times iconsmall" ></i>
            </button>
          </div>
          <h5 className="text-orange-500 font-semibold text-center w-full">
            Thêm Danh Mục
          </h5>
          <form
            className="h-full w-full space-y-4 flex flex-col text-sm"
          onSubmit={(e)=>addCat(e)}
          >
            <input
              className="border-2 border-gray-300 rounded-md w-36 mt-2 ml-2 h-6 p-2 text-gray-500"
              onChange={(e)=>{changeCatName(e)}}
              autoComplete="on"
              required
              id="nameAddCat"
              placeholder="CategoryName"
            />
            <select
              className="border-2 border-gray-300 rounded-md w-44 ml-2 mt-2 h-8 text-xs text-gray-500"
              onChange={(e)=>{changeSupCat(e)}}
              id="supAddCat"
            >
              <option value="" disabled selected>
                Chọn Danh Mục Cha (Nếu có)
              </option>
              {Categories.map((cat, index) => (
                <option key={index} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
            <button
              type="submit"
              className="text-white bg-orange-400 h-7 p-1 rounded-md w-20 ml-12 mt-4" onClick={()=>{Toggle("formAddCat")}}
            >
              Thêm
            </button>
          </form>
        </div>
      </div>
      <div className="w-full h-auto mt-3 px-2">
        <div className="accordion accordion-flush" id="accordionFlushExample">
          {Categories&&Categories.map((cat, index) => (
            <div key={index} className="accordion-item">
              <h2 className="accordion-header flex relative"  onMouseLeave={()=>MouseOut(`FormChild${cat.id}`)}>
                <button onMouseEnter={()=>Toggle(`FormChild${cat.id}`)}
                  className="accordion-button w-1/2 collapsed font-medium text-2xl flex-shrink-0 relative"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target={`#flush-collapseOne${index}`}
                  aria-expanded="false"
                  aria-controls={`flush-collapseOne${index}`}
                >
                  {cat.name}
                </button>
                <button className="flex justify-end w-2 h-2 mt-4 md:ml-6 text-sm flex-shrink-0">
                  <i className="fas fa-edit" onClick={()=>{Toggle((`FormEditCart${cat.id}`))}}  data-right="editProductCategory"></i>
                </button>
                <div className="hidden absolute left-12 top-2 shadow z-40 w-52 h-56 bg-white font-medium text-sm text-orange-300 p-2 overflow-y-auto overflow-x-hidden" id={`FormChild${cat.id}`}>
                  <h5 className="text-lg font-semibold my-2 text-center w-full  relative">
                    Danh mục con
                  </h5>
                  <button className='ml-40' >
                    <i className="fas fa-plus text-gray-600 iconsmall ml-2" onClick={()=>Toggle(`FormAddChild${cat.id}`)}></i>
                  </button>
                  <div className="hidden absolute right-2 shadow z-50 w-36 h-32 bg-white text-gray-500 p-2" id={`FormAddChild${cat.id}`}>
                    <h5 className="text-sm font-semibold my-2 text-center w-full">
                      Thêm danh mục con
                    </h5>
                    <form onSubmit={(e)=>{AddChild(e,cat.id)}}>
                      <select
                        className="border-2 border-gray-300 rounded-md w-28 ml-2 h-6 text-xs text-gray-500"
                      onChange={(e)=>{changeChildId(e)}}
                      >
                        <option value="" disabled selected>
                          Chọn Danh Mục
                        </option>
                        {Categories.map((cate, idx) =>
                          ( cate.id !== cat.id ? (
                            <option key={idx} value={cate.id}>
                              {cate.name}
                            </option>
                          ) : null)
                        )}
                      </select>

                      <button
                        className="bg-orange-500 rounded-md h-6 w-16 text-sm mt-2 ml-7 text-gray-600"
                        type="submit" onClick={()=>Toggle(`FormAddChild${cat.id}`)}
                      >
                        Thêm
                      </button>
                    </form>
                  </div>
                  {cat.categoryChild&& cat.categoryChild.length === 0 ? (
                    <p>Không chứa danh mục con nào</p>
                  ) : (
                    cat.categoryChild
                    ? cat.categoryChild
                        .filter(categ => categ.deleted === false) // Giữ lại các mục có deleted === false
                        .map((child, idx) =>
                      child ? (
                        <div key={idx} className="w-full flex">
                          <p className="flex-1 w-2/3 justify-start">
                            {child}
                          </p>
                        
                            <button className="text-sm text-gray-600" onClick={()=>{RemoveChild(cat.id,child)}}>
                              <i className="fas fa-trash-alt"></i>
                            </button>
                      
                        </div>
                      ) : null
                    )
                  :null)}
                </div>
                <div className="hidden absolute right-1 top-8 shadow z-50 w-48 h-48 bg-white text-gray-500 px-3" id={`FormEditCart${cat.id}`} >
                  <div className="w-full flex justify-end bg-yellow">
                    <button>
                      <i className="fas fa-times iconsmall" onClick={()=>{Toggle((`FormEditCart${cat.id}`))}}></i>
                    </button>
                  </div>
                  <h5 className="text-orange-500 font-semibold text-center w-full">
                    Chỉnh Sửa
                  </h5>
                  <form
                    className="h-full w-full space-y-4 flex flex-col text-sm"
                    onSubmit={(e)=>{EditCat(e,cat.id)}}
                  >
                    <input
                    key={cat.id}
                      className="border-2 border-gray-300 rounded-md w-36 mt-2 h-6 p-2 text-gray-500"
                      
                      autoComplete="on"
                      placeholder={cat.name}
                      onChange={(e)=>{changeCatName(e)}}
                      required
                      
                    />
              
                    
                    <button
                      type="submit"
                      className="text-white bg-orange-400 h-7 p-1 rounded-md w-20 ml-8 mt-3" onClick={()=>{Toggle((`FormEditCart${cat.id}`))}}
                    >
                      Sửa
                    </button>
                  </form>
                </div>
                
                  <button
                    className="flex justify-end w-2 h-2 mt-4 ml-2 text-sm flex-shrink-0"
                    onClick={()=>{RemoveCat(cat.id)}} data-right="">
                    <i className="fas fa-trash-alt"></i>
                  </button>
                
              </h2>
              <div
                id={`flush-collapseOne${index}`}
                className="accordion-collapse collapse"
                data-bs-parent="#accordionFlushExample"
              >
                <div className="accordion-body space-y-4 w-full">
                  <div className="w-full px-1 my-6 flex justify-end relative">
                    <button>
                      <i className="fas fa-plus" onClick={()=>{Toggle((`FormAddproductToCat${cat.id}`))}}></i>
                    </button>
                    <div className="hidden absolute right-10 shadow z-50 w-52 h-48 bg-white text-gray-500 p-3" id={`FormAddproductToCat${cat.id}`}>
                      <div className="w-full flex justify-end bg-yellow">
                        <button>
                          <i className="fas fa-times iconsmall" onClick={()=>{Toggle((`FormAddproductToCat${cat.id}`))}}></i>
                        </button>
                      </div>
                      <h5 className="text-orange-500 font-semibold text-center w-full">
                        Thêm Sản Phẩm
                      </h5>
                      <form
                        className="h-full w-full space-y-4 flex flex-col text-sm ml-6" onSubmit={(e)=>{AddProToCat(e,cat.id)}}
                      >
                        <input
                          className="border-2 border-gray-300 rounded-md w-36 mt-2 h-6 p-2 text-gray-500"
                        onChange={(e)=>{changeProId(e)}}
                          autoComplete="on"
                          required
                          placeholder="ProductId"
                        />
                        <button
                          type="submit"
                          className="text-white bg-orange-400 h-7 p-1 rounded-md w-20 ml-8 mt-4" onClick={()=>{Toggle((`FormAddproductToCat${cat.id}`))}}
                        >
                          Thêm
                        </button>
                      </form>
                    </div>
                  </div>
                  {cat.productIds&&cat.productIds.map((pro, idx) =>
                    pro ? (
                      <div key={idx} className="flex justify-between">
                        <p>{pro}</p>

                          <button onClick={()=>RemoveProductFormCart(cat.id,pro)}>
                            <i className="fas fa-trash-alt"></i>
                          </button>
                      
                      </div>
                    ) : null
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main></body>
  );
};

export default ManageCategory;
