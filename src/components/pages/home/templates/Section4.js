import React from "react";
import section_giao_hang from "../../../../assets/images/section_giao_hang.webp";
import { Link } from "react-router-dom";

const Section4 = () => {
     return (
          <section className="section4 center">
               <div className="container grid grid-cols-3 gap-10">
                    <div>
                         <h1>
                              Chọn những gì bạn muốn, chọn thời gian nhận hàng
                         </h1>
                         <p>
                              Nhà hàng chuyên phục vụ những món ăn đặc sắc, đúng
                              hương vị do chính các đầu bếp Việt Nam chế biến từ
                              những nguyên liệu tươi ngon nhất với một mức chi
                              phí hợp lý.
                         </p>
                         <Link to="/collections/all" className="main__button">
                              Đặt hàng
                         </Link>
                    </div>
                    <div>
                         <img src={section_giao_hang} alt="" />
                    </div>
                    <div>
                         <h1 className="text-right">
                              Kiểm tra đơn hàng trước khi nhận được hàng
                         </h1>
                         <p className="text-right">
                              Như đã biết và chúng tôi rất bận rộn cả ngày để tư
                              vấn cho bạn. lời khuyên bạn nên gọi cho chúng tôi
                              trước khi đến, để chúng tôi có thể đảm bảo chỗ
                              ngồi cho bạn.
                         </p>
                         <Link
                              to="/collections/all"
                              className="main__button float-right"
                         >
                              Đặt hàng
                         </Link>
                    </div>
               </div>
          </section>
     );
};

export default Section4;
