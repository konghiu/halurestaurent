import React from "react";

// css, image, file
import "./news.css";
import Category from "../../lauout/category/Category";
import aside_banner from "../../../assets/images/aside_banner.webp";
import news1 from "../../../assets/images/news1.webp";

const News = () => {
    return (
        <section className="news center py-8">
            <div className="container flex">
                <aside className="news__left">
                    <Category />
                    <div className="my-8">
                        <h1 className="main__bg font-bold rounded-t-md text-white py-2 px-3">
                            BÀI VIẾT LIÊN QUAN
                        </h1>
                        <ul className="px-4 py-1 border-1 rounded-b-md border-t-0">
                            {[1, 2, 3, 4].map((num) => (
                                <li
                                    key={num}
                                    className="flex py-2 border-b-1"
                                    style={num === 4 ? { border: "none" } : {}}
                                >
                                    <div className="w-36">
                                        <img src={news1} alt="" />
                                    </div>
                                    <span className="text-sm ml-2 cursor-pointer hover:main__color">
                                        Gợi ý thực đơn ngon ăn chay cho ngày rằm
                                        tháng Giêng
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <img src={aside_banner} alt="" />
                </aside>
                <div className="news__right flex-1 ml-10">
                    {[1, 2, 3, 4, 5].map((num) => (
                        <div key={num} className="flex mb-6">
                            <div className="w-64">
                                <img src={news1} alt="" />
                            </div>
                            <div className="ml-6">
                                <h2 className="font-bold hover:main__color cursor-pointer">
                                    Gợi ý thực đơn món ăn chay vào ngày rằm
                                    tháng Giêng
                                </h2>
                                <p className="text-xs my-2">
                                    <span className="main__color">
                                        Nguyễn Huỳnh Công Hiếu
                                    </span>
                                    <span> - 22/22/2222 - </span>
                                    <span className="first-letter:main__color">
                                        {"0 Binh luận"}
                                    </span>
                                </p>
                                <p className="limit__line litmit_1 text-sm">
                                    Quan niệm ăn chay ngày rằm đã là thói quen
                                    truyền thống của người Việt ta từ xưa đến
                                    nay
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default News;
