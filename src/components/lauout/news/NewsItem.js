import React from "react";

import news1 from "../../../assets/images/news1.webp";
import "./newsItem.css";
import { BsCalendar3 } from "react-icons/bs";

const NewsItem = () => {
     return (
          <div className="m-2 overflow-hidden rounded-md border-1">
               <div>
                    <img src={news1} alt="news 1" />
               </div>
               <div className="p-2">
                    <p>
                         <BsCalendar3 />
                         <span className="text-xs ml-2">22/22/2222</span>
                    </p>
                    <h3 className="uppercase mt-3 text-sm font-bold">
                         Giợ ý thực đơn mon chay cho ngày rằm thàng giêng
                    </h3>
                    <p className="my-4 text-xs text-gray-500 limit__line">
                         Quan điểm ăn chay ngày rằm đã trở thành thói quen
                         truyền thống của người Việt ta từ xưa đến nay. Cứ đến
                         ngày rằm là ăn chay
                    </p>
                    <button className="main__button">Đọc tiếp</button>
               </div>
          </div>
     );
};

export default NewsItem;
