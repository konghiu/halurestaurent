// models
import React from "react";
// assets
import home_bg_slide_1 from "../../../../assets/images/home_bg_slide_1.webp";
import section_home_banner1 from "../../../../assets/images/section_home_banner1.webp";
import section_home_banner2 from "../../../../assets/images/section_home_banner2.webp";
import section_home_banner3 from "../../../../assets/images/section_home_banner3.webp";
import section_home_banner4 from "../../../../assets/images/section_home_banner4.webp";
import serviceShipping from "../../../common/serviceShipping";

const Section1 = () => {
     return (
          <div id="section1">
               <div>
                    <img src={home_bg_slide_1} alt="home bg slide 1" />
               </div>
               <div className="container py-5">
                    <div className="section1__banners">
                         <div>
                              <div className="item">
                                   <img src={section_home_banner1} alt="" />
                              </div>
                         </div>
                         <div>
                              <div className="item2 item">
                                   <img src={section_home_banner2} alt="" />
                              </div>
                              <div className="item2 item">
                                   <img src={section_home_banner3} alt="" />
                              </div>
                         </div>
                         <div>
                              <div className="item4 item">
                                   <img src={section_home_banner4} alt="" />
                              </div>
                         </div>
                    </div>
                    <div className="section1__serviceShipping grid grid-cols-3 gap-8 px-4 py-5">
                         {serviceShipping.map((service) => (
                              <div key={service.id} className="item">
                                   <div className="item__image">
                                        <img src={service.icon} alt="" />
                                   </div>
                                   <div className="item__content">
                                        <h3 className="font-medium text-lg">
                                             {service.title}
                                        </h3>
                                        <p>{service.description}</p>
                                   </div>
                              </div>
                         ))}
                    </div>
               </div>
          </div>
     );
};

export default Section1;
