import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Card from './card';


const Search = () => {
    const location = useLocation();
    const query = location.state?.query || '';
    const filterI = location.state?.filterItems || [];

    return (
            <div className="container mt-28 w-full h-auto ">
                <div className="row flex flex-wrap gap-3 md:gap-3">
                    {filterI.map(item => (
                        <Card key={item.id} product={item} />
                    ))}
                </div> </div>
        );
  
};

export default Search;



