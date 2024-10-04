import React, {useState,useEffect} from 'react';
import Card from './card';



const Category = ()=>{
const [key, setkey]=useState('1')
const [product, setpro] = useState([])
const [categories,setcat]=useState([])
const [categoryProduct,setProduct]= useState([])
 useEffect(() =>{ const fetchCat= async ()=>{ 
  try{
    const response = await  fetch (`/api/categories`)
     if(!response.ok){
    throw new Error("Not Responding")
  }
    const Category = await response.json()
    setcat(Category)
 }
    catch (err){
      console.error(err)
    }
}


    fetchCat()

  },[])
  useEffect(() => {
    const fetchPro = async() =>{
      try{

      const response = await fetch (`/api/products`)
       if(!response.ok){
        throw new Error("Not responding")
      }
      const pro= await response.json()
      
      setpro(pro);
     
    
    }
      catch(err){
        console.error(err)
      }
     
     


    }
    fetchPro()
   
  }, []);


  useEffect(()=>{
    const FindPro = ()=>{

      const ProductId= categories.find(cate=>cate.id===key)
      if(ProductId && ProductId.productIds){
        const ProductOfCat = ProductId.productIds.map(Id=>product.find(item=>item.id===Id))
        setProduct(ProductOfCat)}
      else {
        setProduct([])
      }
      


    }
    FindPro()
  },[key,product,cat])


 
  var cat=categories;
  cat.forEach(item=>{
  
    if(item.categoryChild){
      item.categoryChild.forEach(child=>{
        cat= cat.filter(category=>category.id!==child)
      })

    }



  

})

function handlePick(e){
  setkey(e.target.value)
  
}

const FindChildrentCategory = (category)=>{
  
  if(category.categoryChild){

    const check= ()=>{
      return category.categoryChild.map(child=>{

      var temp=categories.find(cata=>cata.id===child)
      return <button key={child}  onClick={handlePick} value={temp.id} className="text-sm text-red-400 flex-shrink-0 mb-2 h-4 hover:p-1 hover:bg-gray-100 focus:text-pink-600">{temp.name}<hr/></button>
    
    })}
    
    
    return  <div className="absolute left-28 bottom-1 overflow-y-auto overflow-x-hidden scrollable-container flex flex-col justify-start z-8 h-20 w-24 shadow-md border-none z-99 hidden" id={category.id} onMouseLeave={()=>{btnBlur(category.id)}}>{check()}</div>
    }
   
  }
  
const btnclick =(id)=>{
  const categoriesContainer = document.getElementById(id);
  categoriesContainer.classList.toggle('hidden')
  
  
}

const btnBlur = (id)=>{
const Ele =document.getElementById(id);
    Ele.classList.add('hidden')
  
}

    return (
      <div>

        <div className='fixed z-50 top-16 left-0 w-full h-32 shadow overflow-y-hidden overflow-x-auto flex items-center justify-around whitespace-nowrap text-orange-600 space-x-12 text-xl font-medium bg-white'>
            {cat.map(category => (
              <button key={category.id}   onClick={() => (category.categoryChild ? btnclick(category.id) : handlePick({ target: { value: category.id } }))} value={category.id}  className="flex-shrink-0 px-3 z-1 py-2 hover:bg-gray-50 focus:text-orange-400 focus:border-1 focus:p-4 focus:text-2xl  focus:font-semibold relative">
                {category.name} {FindChildrentCategory(category)}
              </button>
            ))}
          </div>

        <div className='container z-1 mt-60  flex flex-wrap  w-full h-auto gap-3 justify-center items-center md:justify-start md:items-starttext-xl text-gray-600 font-medium'>{(categoryProduct.length==0)?(
          <p className='w-full mx-6 mt-8 justify-center items-center text-sm md:text-lg md:ml-auto  '>Không có sản phẩm nào thuộc danh mục này</p>):(categoryProduct.map(
            pro=>(
            <Card key={pro.id} product={pro}/>
            
            )))}</div>
      </div>
     
    
    
  )
}

export default Category;