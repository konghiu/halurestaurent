import React from "react";
import clsx from "clsx";
// image and css
import "./introduction.css";
import about_image_5 from "../../../assets/images/about-imager-5.webp";
import historyList from "../../common/historyList";

const Introduction = () => {
     return (
          <section className="introduction center py-12">
               <div className="container">
                    <div className="grid grid-cols-2 gap-10">
                         <div>
                              <h1 className="italic main__color text-2xl mb-4">
                                   Chất lượng
                              </h1>
                              <h2 className="text-3xl font-bold">Gà Rán</h2>
                              <p className="text-sm my-3 leading-6">
                                   Chất lượng là thành phần số 1 của chúng tôi.
                                   Đó là lý do tại sao Cánh gà, Cắn gà và
                                   Topping gà nướng của chúng tôi được làm từ gà
                                   được nuôi không dùng thuốc kháng sinh và cho
                                   ăn chế độ ăn hoàn toàn từ ngũ cốc thực vật,
                                   không có phụ phẩm từ động vật. Thêm vào đó,
                                   Bites của chúng tôi được làm bằng 100% thịt
                                   ức gà.
                              </p>
                              <button className="main__button">Xem thêm</button>
                         </div>
                         <div>
                              <img src={about_image_5} alt=" " />
                         </div>
                    </div>
                    <div className="introduction__history">
                         <h1 className="text-center uppercase py-4 text-3xl">
                              Lịch sử nhà hàng
                         </h1>
                         <div className="relative">
                              {historyList.map((his, index) => (
                                   <div
                                        className={clsx(
                                             "history__item flex gap-32 my-12",
                                             {
                                                  "history-reverse":
                                                       index % 2 === 1,
                                             }
                                        )}
                                        key={his.id}
                                   >
                                        <div className="flex-1 flex justify-between items-start">
                                             <div className="flex-1">
                                                  <h2 className="history__title">
                                                       {his.title}
                                                  </h2>
                                                  <p className="history__detail">
                                                       {his.detail}
                                                  </p>
                                             </div>
                                             <div className="w-1/3">
                                                  <h1 className="history__year float-right text-2xl relative main__color font-bold">
                                                       {his.year}
                                                  </h1>
                                             </div>
                                        </div>
                                        <div className="overflow-hidden rounded-xl flex-1">
                                             <img src={his.urlImage} alt="" />
                                        </div>
                                   </div>
                              ))}
                         </div>
                    </div>
               </div>
          </section>
     );
};

export default Introduction;
