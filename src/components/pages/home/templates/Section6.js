import React from "react";
import logo from "../../../../assets/images/logo.webp";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";

const Section6 = () => {
     return (
          <section className="section6 center flex-col items-center py-16">
               <div className="container">
                    <h2 className="home__h2 text-center mb-8">
                         KHÁCH HÀNG NÓI GÌ
                    </h2>
                    <div className="grid grid-cols-3 gap-4">
                         {[1, 2, 3].map((num) => (
                              <div
                                   key={num}
                                   className="section6__customer p-6 bg-white rounded-lg"
                              >
                                   <div className="flex">
                                        <div className="consumer__avatar w-10 h-10 rounded-full border-1">
                                             <img src={logo} alt="" />
                                        </div>
                                        <div className="flex-1 font-bold ml-2">
                                             <h3>nguyễn Huỳnh Công Hiếu</h3>
                                             <p className="text-sm text-gray-500">
                                                  Developer
                                             </p>
                                        </div>
                                        <div className="main__color">
                                             <AiFillStar />
                                             <AiFillStar />
                                             <AiFillStar />
                                             <AiFillStar />
                                             <AiOutlineStar />
                                        </div>
                                   </div>
                                   <p className="mt-3 text-justify text-sm leading-7">
                                        Mình rất thích đưa khách hàng của mình
                                        đến đây bởi vì phong cách rất chuyên
                                        nghiệp.Hơn nữa thức uống ở đây rất ngon,
                                        có hương vị rất khác biệt , các vị khách
                                        của mình vô cùng thích.
                                   </p>
                              </div>
                         ))}
                    </div>
               </div>
          </section>
     );
};

export default Section6;
