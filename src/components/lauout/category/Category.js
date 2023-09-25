import React from "react";
import navigationBar from "../../common/navigationBar";
import { Link } from "react-router-dom";

const Category = () => {
     return (
          <div className="">
               <h1 className="main__bg font-bold rounded-t-md text-white py-2 px-3">
                    DANH MỤC BÀI VIẾT
               </h1>
               <ul className="border-1 border-t-0 rounded-b-md py-2">
                    {navigationBar.map((nav) => (
                         <li key={nav.id} className="pb-1 px-3 text-sm">
                              <Link
                                   to={`/${nav.url}`}
                                   className="hover:main__color"
                              >
                                   {nav.title}
                              </Link>
                         </li>
                    ))}
               </ul>
          </div>
     );
};

export default Category;
