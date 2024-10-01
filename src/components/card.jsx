import React from "react";
import { Link } from "react-router-dom";

const Card = ({product})=>{
    
    return (
        <div className="card z-1 mx-3 mt-6 md:ml-8" style={{ width: '16.5rem', height: '23rem' }}>
        <img src={product.image} className="card-img-top h-52" alt={product.name} />
        <div className="card-body">
            <h5 className="card-title text-2xl md:text-4xl w-full h-18">{product.name}</h5>
            <p className="card-text d-flex justify-content-between mx-2">
                <del className="text-lg font-semibold  text-red-500">{product.price}</del>
                <span className="text-lg font-bold  text-green-700">
                    {(product.price * (1 - product.discount)).toFixed(2)}
                </span>
            </p>
            <Link to={`/productDetail/${product.id}`} className="btn  ml-6 w-40 h-15">
            <button className='text-yellow-50 bg-gradient-to-b from-orange-400 to-pink-500 rounded-md px-2 py-1'>View Details</button></Link>
        </div>
    </div>
    )

}

export default Card; 