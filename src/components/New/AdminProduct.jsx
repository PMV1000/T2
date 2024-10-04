import React from "react";
import { useEffect,useState } from "react";
import { Editor } from '@tinymce/tinymce-react';
import he from 'he'
import cryptoRandomString from "crypto-random-string";
import HeaderAdmin from'./headerAdmin'
import { json } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { removeProduct,addProduct } from "../../action/produtcs";

const ManageProduct = () => {
  const dispatch = useDispatch();
  const [content, setContent] = useState('');
  const [price, setprice] = useState('');
  const [feature, setfeature] = useState('');
  const [name, setname] = useState('');
  const [image, setimage] = useState([]);
  const [imagefile, setimagefile] = useState([]);

  const [category, setcategory] = useState('');
  const initalPro = useSelector(state=>state.products.products)

  const [products,setPro]=useState([initalPro])
  const catergories=useSelector(state=>state. categories.categories)


  
  const handleEditorChange = (newContent)=> {
    
    setContent(newContent)
  };

  const handleChangename = (e) => {
    e.preventDefault()
    setname(e.target.value);
  };

  const handleChangeprice = (e) => {
    e.preventDefault()
    setprice(e.target.value);
  };

  const handleChangeimage = (e) => {
    e.preventDefault()
    setimage(e.target.value);
    setimagefile(e.target.files)
  };

  const handleChangeFeature = (e) => {
    
    e.preventDefault()
    setfeature(e.target.value);
  };

  const handleCategoryChange = (e) => {
    e.preventDefault()
    setcategory(e.target.value);
  };

  const open=(id)=>{
    const Filter=document.getElementById(id)
    Filter.classList.toggle('hidden')

  }
  const reset = (id=[])=>{
    id.map(Id=>{
    const E= document.getElementById(Id)
    E.value=''
    })

}

  const AddProduct= async (e)=>{
    const id =cryptoRandomString({length:32,"type":"alphanumeric"})
    const c=he.decode(content.replace(/<[^>]*>/g,''))  
    // Giải mã HTML entities va cờ toàn cục g để loại bỏ toàn bộ
    dispatch(addProduct({id:id,name:name,price:price,catagoly:category,desc:c,discount:0,isFeature:feature,deleted:false,image:image[0]}))
    await fetch (`/api/products`,{
      method:"PUT",
      headers:{"content-Type":"application/json"},
      body: JSON.stringify(initalPro)
    })
    const CARTCHILD = catergories.find(cat=>cat.id===category)
    await fetch(`/api/categories/${category}`,{
      method:"PUT",
      headers:{"content-Type":"application/json"},
      body:JSON.stringify({categoryChild :[...CARTCHILD,id]})

    })
    

  }
  const RMPro= async (id)=>{
    dispatch(removeProduct(id))

    

  await fetch (`/api/products/${id}`,{
        method:"PATCH",
        headers:{"content-Type":"application/json"},
        body: JSON.stringify({deleted:true})
      })

  }


  const ChangeFeature = async (event,id)=>{
    const status=event.target.checked
    await fetch (`/api/products/${id}`,{
      method:"PATCH",
      headers:{"content-Type":"application/json"},
      body: JSON.stringify({isFeature:status})
    })
    window.location.reload()
  }

  const FilterStaus =(status)=>{
    if(status==="00"){
      // Ở đây không thể đặt null để tránh nhầm lẫn với giá trị false
      window.location.reload()
    }
    else{
    setPro(products=>products.filter(pro=>pro.deleted===status))
    }

  }
    return (
      <body>
        <HeaderAdmin/>
        <main className="w-full mt-36 ">
                  
        <h3 className="text-orange-400 text-2xl mt-2 text-center w-full mt-10"> Danh Sách Sản Phẩm</h3>
                  <div className=" ml-12  text-gray-500  w-5/6 relative">
                      <div className="   flex justify-start ">
                          <button className="mt-16" onClick={()=>{open("filter");reset(["feature","CatofPro","image","priceOfPro","nameOfproduct"])}}>
                              <i className="fas fa-filter "></i></button>
                          <div className="absolute letf-4 space-y-2 top-24 shadow h-36 w-24 bg-white text-sm text-gray-600 hidden" id="filter">
                              <button className="mt-2" onClick={()=>{FilterStaus(false)}}> Đang Hoạt Động </button>
                              <hr className="w-full"/>
                              <button onClick={()=>{FilterStaus(true)}}> Dừng Hoạt Động </button>
                              <button className="mt-2 border-orange-400 text-orange-500 font-bold border-2 ml-4 rounded-lg" onClick={()=>{FilterStaus("00")}} > Bỏ Chọn </button>

                              
                              </div></div>
                      <div className=" flex justify-end mr-10 ">
                          <button onClick={()=>{open("addForm")}}>
                              <i className="fas fa-plus" data-right="addProduct"></i></button>
                          <div className="hidden absolute letf-4 top-12 shadow h-auto  w-6/7 bg-white space-y-4 text-md font-bold  text-gray-600 p-3" id="addForm">
                              <div className="w-6/7 mt-2 flex justify-end">
                                  <button onClick={()=>{open("addForm")}}>
                                      <i className="fas fa-times"  ></i></button></div>
                              <h3 className=" text-2xl text-orange-500 font-semibold text-center w-full"> Thêm Mới Sản Phẩm</h3>
                              <form className=" mt-8 h-full w-full  space-y-4 " onSubmit={(e)=>{AddProduct(e)}}>
                                  <input className="border-2 border-gray-300 rounded-md w-2/3 ml-20 mt-4 h-6 p-2 text-sm-gray-500 " autocomplete="on" onChange={handleChangename} required placeholder="ProductName" id="nameOfproduct"/> 
                                  <input className="border-2 border-gray-300 rounded-md w-2/3 ml-20  mt-2 md:mt-3 h-6 p-2 text-sm text-gray-500 "type="Number" min="1" autocomplete="on" onChange={handleChangeprice} required placeholder=" Giá" id="priceOfPro"/>
                                  <br />
                                  <label htmlFor="image" className="ml-20  font-bold text-xs md:text-lg" > Chọn ảnh sản phẩm:</label>
                                  <input type="file" className="h-8  w-2/3 md:w-1/2 border-2 border-gray-300 ml-20 md:ml-2 rounded-md  mt-8  " placeholder="Chọn hình ảnh " onChange={handleChangeimage} required multiple id="image"/>
                                  
                                  <select className="border-2 border-gray-300 rounded-md w-2/3 ml-20 mt-2 md:mt-3 h-12 p-2 text-sm text-gray-500" onChange={handleCategoryChange } required id="CatofPro">
                                      <option value="" disabled selected> Chọn Danh Mục Sản Phẩm</option>
                                      {catergories.map(cat=>(
                                    
                                      <option value={cat.id}> {cat.name} </option>))}</select>
                                      <label htmlFor="feature" className="ml-8 mr-2 font-bold text-lg" > Sản Phẩm Nổi Bật :</label>
                                      <input type="checkbox" id="feature" onChange={handleChangeFeature}  />
                                  
                                      <Editor
              apiKey="JgDbF40wt4CUOfMTjR_U2IfoPNI" // Thay thế với API key của bạn nếu cần
              initialValue="<p>Mô Tả Sản Phẩm</p>"
              init={{
              
                menubar: false,
                plugins: [
                  'advlist autolink lists link image charmap preview anchor',
                  'searchreplace visualblocks code fullscreen',
                  'insertdatetime media table paste code help wordcount'
                ],
                toolbar:
                  'undo redo | formatselect | bold italic backcolor | \
                  alignleft aligncenter alignright alignjustify | \
                  bullist numlist outdent indent | removeformat | help',
                content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
                setup: (editor) => {
                  editor.on('init', () => {
                    const textareaElement = editor.getElement();
                    textareaElement.id = 'mytextarea';
                    textareaElement.classList.add('ml-12', 'mt-4', 'border-2', 'border-gray-300', 'rounded-md', 'w-5/6', 'h-40');
                  });
                }
              }}
              value={content}
              onEditorChange={handleEditorChange}
            />


                                  <button  type="submit" className="text-orange-400 h-9 p-1 border-2 border-red-400 rounded-md w-28 ml-28 md:ml-6  mt-40"> Thêm</button></form>
      </div></div></div>
                  <div className="w-full h-auto mt-6  px-2">
                      
                      <table className="text-center w-full">
                          <thead className="divide-y">
                          
                              <tr className="h-28 ">
                                  <th className="w-20"> Id</th>
                                  <th className="w-56"> Hình Ảnh</th> 
                                  <th className="w-48"> Tên Sản Phẩm</th> 
                                  <th className="w-96"> Mô Tả Sản Phẩm</th> 
                                  <th className="w-32 ">  Giá</th>
                                  

                                  <th className="w-40"> trạng thái</th>
                                  <th className="w-32 ">  Nổi Bật </th>
                                  <th className="w-20"></th> </tr></thead>
                          <tbody className="md:divide-y">
                              {products.map(pro=>(
                                  <tr className="h-68  text-sm">
                                      <td> {pro.id}</td>
                                      <td>
                                          <img className="md:w-48 w-24 h-20 md:mb-8 md:h-36" src='/image/images1.jpg'/></td>
                                      <td> {pro.name}</td>
                                      <td> {pro.desc}? Accusamus error labore dolor, delectus adipisci fugit ut, nemo quis incidunt eaque, aut quod.</td>
                                      <td> {(pro.price*(1- pro.discount)).toFixed(3)} đ </td>
                                      <td> 
                                          <button className={(pro.deleted)? "bg-orange-600 rounded-md h-10 w-32 p-1 text-center ": "bg-green-700 rounded-md h-10 w-32 p-1 text-center text-white"}>
                                              <span className=" text-sm">{(!pro.deleted)? "Đang Hoạt Động":" Ngừng Hoạt động"}</span></button></td>
                                      
                                              <td data-right="editProduct" >
                                          <input type="checkbox" checked={pro.isFeature||false} onChange={(e)=>ChangeFeature(e,pro.id)} id={`check${pro.id}`} />
                                      </td>
                                      <td >
                                          
                                          <button data-right="deleteProduct" >
                                              <i className="fas fa-trash-alt ml-2 md:mt-0 mt-2" onClick={()=>RMPro(pro.id)}></i></button></td>
                                      
                                              
                                              </tr>))}
                                  
      </tbody></table>
              </div></main></body>
          )
      }
      {/* 

      // script(src="https://cdn.tiny.cloud/1/5fxl12ux1gwq75ukb0yjklc0rc23764knyyf5lb8rq6x6qij/tinymce/7/tinymce.min.js" referrerpolicy="origin")
      // script.
      //   tinymce.init({
      //     selector: '#mytextarea',
      //     plugins: [
      //       'a11ychecker', 'advlist', 'advcode', 'advtable', 'autolink', 'checklist', 'markdown',
      //       'lists', 'link', 'image', 'charmap', 'preview', 'anchor', 'searchreplace', 'visualblocks',
      //       'powerpaste', 'fullscreen', 'formatpainter', 'insertdatetime', 'media', 'table', 'help', 'wordcount'
      //     ],
      //     toolbar: 'undo redo | formatpainter casechange blocks | bold italic backcolor | ' +
      //       'alignleft aligncenter alignright alignjustify | ' +
      //       'bullist numlist checklist outdent indent | removeformat | a11ycheck code table help',

      //   }); */}

      export default ManageProduct;
      

