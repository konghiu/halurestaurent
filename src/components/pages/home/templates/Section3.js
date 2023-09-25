import React from "react";
import Slider from "react-slick";
import Product from "../../../lauout/item/Product";
import { handleGetCategory } from "../../../service/APIService";
import { useState } from "react";

const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 2,
};

const Section3 = () => {
    const [section3arr, setSection3arr] = useState([]);

    React.useEffect(() => {
        handleGetCategory(1)
            .then((res) => setSection3arr(res.data))
            .catch((err) => console.log(err));
    }, []);

    return (
        <section className="section3 center pt-8 pb-16">
            <div className="container">
                <h1 className="home__h1 text-center">Món ngon mỗi ngày</h1>
                <h2 className="home__h2 text-center">CÓ GÌ BẤT NGỜ TẠI ĐÂY</h2>
                <Slider {...settings} className="section3__slide mt-5">
                    {section3arr.map((item) => (
                        <Product item={item} key={item._id} />
                    ))}
                </Slider>
            </div>
        </section>
    );
};

export default Section3;
