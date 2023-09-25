import React from "react";
import { BsFillCartPlusFill } from "react-icons/bs";
import { FaRegEye } from "react-icons/fa";
import { useDispatch } from "react-redux";
// css
import "./item.css";
import { addCart, reviewProduct } from "../../../reducers/productSlice";
import { useNavigate } from "react-router-dom";
import { convertCost } from "../../service/features";
import { url } from "../../service/APIService";

const Product = ({ item, layout }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleDetailItem = () => {
        navigate(`/halurestaurent/collections/detail/${item.slug}`);
    };

    return (
        <div className="container-product">
            <div className="product">
                <div className="product__image relative w-full">
                    <img src={`${url}/images/${item.image}`} alt="product" />
                </div>
                <div>
                    <h3
                        className="product__name hover:main__color cursor-pointer w-fit"
                        onClick={handleDetailItem}
                    >
                        {item.name}
                    </h3>
                    <h3 className="product__price inline">
                        {convertCost(item.price)}
                        <sup>đ</sup>
                    </h3>
                    <p
                        className="product__description limit__line limit_2  mb-4 text-sm text-gray-500"
                        style={layout === 1 ? {} : { display: "none" }}
                    >
                        HaluRestaurant đã mở thêm 954 cửa hàng, nâng tổng số cửa
                        hàng lên 2.841 cửa hàng và trở thành chuỗi cửa hàng
                        pizza phát triển nhanh nhất tại Hoa Kỳ. Cửa hàng Poco
                        Pizza đầu tiên được mở tại Vương quốc Anh, trong Luton
                        The Deep Pan Pizza
                    </p>
                    <BsFillCartPlusFill
                        className="product__plusCart inline float-right cursor-pointer"
                        onClick={() => dispatch(addCart(item))}
                    />
                    <span className="product__eye">
                        <FaRegEye
                            className="opacity-50 cursor-pointer hover:opacity-100"
                            onClick={() => dispatch(reviewProduct(item))}
                        />
                    </span>
                </div>
            </div>
        </div>
    );
};

export default Product;
