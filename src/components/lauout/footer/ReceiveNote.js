import React from "react";

const ReceiveNote = () => {
     return (
          <section className="receiveNote center py-16">
               <div className="container flex flex-col items-center">
                    <h2 className="home__h2">Đăng Ký Nhận Tin</h2>
                    <p className="w-1/3 text-center leading-6 my-3">
                         Đăng ký nhận bản tin của chúng tôi để nhận được các sản
                         phẩm mới, mã khuyến mãi nhanh nhất
                    </p>
                    <div className="bg-white border-4 w-1/2 flex border-white rounded-sm">
                         <input
                              type="text"
                              placeholder="Email của bạn"
                              className="flex-1 pl-4"
                         />
                         <button className="main__button">Đăng ký</button>
                    </div>
               </div>
          </section>
     );
};

export default ReceiveNote;
