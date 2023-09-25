import React from "react";

// assets
import images_about1 from "../../../../assets/images/images_about1.webp";
import images_about2 from "../../../../assets/images/images_about2.webp";
import images_about3 from "../../../../assets/images/images_about3.webp";
import { Link } from "react-router-dom";

const Section2 = () => {
     return (
          <section className="section2 center">
               <div className="container flex">
                    <div className="container__content w-2/5">
                         <h2>Giới thiệu !</h2>
                         <h1>HALU RESTAURANT chuyên phục vụ các món pizza</h1>
                         <p>
                              HALU RESTAURANT là điểm đến cho các khách hàng có
                              nhu cầu tiếp khách, tụ tập bạn bè, gia đình, liên
                              hoan sinh nhật.
                         </p>
                         <Link to="/aboutUs" className="main__button">
                              Xem thêm
                         </Link>
                    </div>
                    <div className=" section2__images flex-1 gap-5 ml-10 flex">
                         <div className="item">
                              <img src={images_about1} alt="" />
                         </div>
                         <div>
                              <div className="item">
                                   <img src={images_about2} alt="" />
                              </div>
                              <div className="item">
                                   <img src={images_about3} alt="" />
                              </div>
                         </div>
                    </div>
               </div>
          </section>
     );
};

export default Section2;
