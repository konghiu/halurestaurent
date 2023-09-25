import React from "react";
import section_home_order1 from "../../../../assets/images/section_home_order1.webp";

const Section5 = () => {
     return (
          <section className="section5 center flex-col items-center overflow-hidden">
               <div className="container my-8">
                    <h1 className="home__h1 text-center">Khám Phá Menu</h1>
                    <h2 className="home__h2 text-center">
                         Có gì đặc biệt ở đây
                    </h2>
               </div>
               <div className="grid grid-cols-2">
                    <div className="section5__boxImage none__copy">
                         <img src={section_home_order1} alt="" />
                    </div>
                    <div className="section5__boxProduct px-20 py-12">
                         <ul>
                              {[1, 2, 3, 4, 5, 6].map((num) => (
                                   <li
                                        key={num}
                                        className="flex justify-between font-bold py-5 border-b-1 none__copy"
                                   >
                                        <span className="text-xl">
                                             Lemonades Drink
                                        </span>
                                        <span className="main__color">
                                             100.000
                                             <sup>đ</sup>
                                        </span>
                                   </li>
                              ))}
                         </ul>
                    </div>
               </div>
          </section>
     );
};

export default Section5;
