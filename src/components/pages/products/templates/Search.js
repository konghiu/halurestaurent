import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Product from "../../../lauout/item/Product";
import { handleSearchProduct } from "../../../service/APIService";

const Search = () => {
     const params = useParams();
     const [list, setList] = useState([]);

     useEffect(() => {
          let promise = handleSearchProduct(params.name);
          promise.then((res) => setList(res));
     }, [params.name]);

     return (
          <div className="w-full">
               <h1 className="font-bold text-2xl mb-6">Kết quả tìm kiếm</h1>
               {list.length > 0 ? (
                    <div className="grid grid-cols-4 gap-4">
                         {list.map((item) => (
                              <Product key={item._id} item={item} />
                         ))}
                    </div>
               ) : (
                    <p className="main__border-color border text-center w-full py-3 text-lg">
                         Không có sản phẩm <b>"{params.name}"</b> cần tìm
                    </p>
               )}
          </div>
     );
};

export default Search;
