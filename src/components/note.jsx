import React from "react";
const Note = ()=>{
    return (
        <div className=" fixed md:w-1/5 w-2/5 md:h-68 h-auto md:top-28 top-20 right-0 md:right-20  shadow-md p-3 space-y-3 text-red-400 bg-white ">
            <h6 className="text-red-500 text-center md:text-2xl text-md "> Ghi Chú Tên Đăng Nhập & Mật Khẩu</h6>
            <div className="mt-5  ml-3 relative">
                <h6 className="font-bold m-0"> Admin:</h6>
                
                <h6>adminUser ; admin@example.com ; adminPassword</h6>
                <hr className="w-full font-bold text-gray-400 border-2 border-gray-400  absolute top-0 right-1"/>
                <hr className="w-full font-bold text-gray-400 border-2 border-gray-400  absolute top-80 right-1"/>
               
             
                
            
                <h6 className="font-bold m-0"> ContentAdmin:</h6>
                <h6>contentAdminUser ; contentAdmin@example.com ; contentAdminPassword</h6>
                <h6 className="font-bold m-0"> User:</h6>
                <h6>user109 ; user109@example.com ; password109</h6>
            
            </div>
        </div>
    )
}
export default Note;

//    <div className=" fixed md:w-1/5 w-2/5 md:h-68 h-auto md:top-28 top-20 right-0 md:right-20 bg-yellow-100 shadow-md p-3 space-y-4 text-gray-500">
        //     <h6 className="text-orange-400 text-center md:text-xl text-md"> Ghi Chú Tên Đăng Nhập & Mật Khẩu</h6>
        //     <div className="mt-4 bg-yellow-200 ml-3">
        //         <h6 className="font-bold"> Admin:</h6>
        //         <h6>adminUser ; admin@example.com ; adminPassword</h6></div>
        //     <div className=" bg-yellow-200 ml-3">
        //         <h6 className="font-bold"> ContentAdmin:</h6>
        //         <h6>contentAdminUser ; contentAdmin@example.com ; contentAdminPassword</h6>
        //     </div>
        //     <div className=" bg-yellow-200 ml-3">
        //         <h6 className="font-bold"> User:</h6>
        //         <h6>user109 ; user109@example.com ; password109</h6>
        //     </div>
        // </div>