import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiFillCloseSquare } from "react-icons/ai";

import "./item.css";
import { useDispatch } from "react-redux";
import { reviewProduct } from "../../../reducers/productSlice";
import { url } from "../../service/APIService";

const ReviewItem = ({ item, user }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [quantity, setQuantity] = React.useState(1);

    const handlePaymentProduct = () => {
        dispatch(reviewProduct(null));
        if (!user) {
            alert("Ban can dang nhap.");
            return navigate("/halurestaurent/sign/sign-in");
        }
        const payment = {
            product: { ...item },
            quantity: quantity,
            _id: 1,
        };
        localStorage.setItem("paymentProduct", JSON.stringify(payment));
        navigate("/halurestaurent/payment");
    };

    return (
        <section className="container-reviewItem center">
            <span onClick={() => dispatch(reviewProduct(false))}></span>
            <div className="reviewItem container h-fit">
                <div className=" border-2 border-black rounded-md relative">
                    <AiFillCloseSquare
                        onClick={() => dispatch(reviewProduct(false))}
                        className="absolute cursor-pointer right-2 top-2 text-4xl main__color hover:opacity-50"
                    />
                    <div className="w-2/5">
                        <img src={`${url}/images/${item.image}`} alt="" />
                    </div>
                    <div className="flex-1">
                        <h1 className="reviewItem__name hover:main__color w-fit font-extralight">
                            <Link to="">{item.name}</Link>
                        </h1>
                        <div className="reviewItem__brand_status my-1">
                            <p>
                                Thương hiệu: <span>Chưa có</span>
                            </p>
                            <span>|</span>
                            <p>
                                Trạng thái:{" "}
                                <span>
                                    {item.quantity > 0
                                        ? "Còn hàng"
                                        : "Hết hàng"}
                                </span>
                            </p>
                        </div>
                        <h1 className="reviewItem__price main__color">
                            {item.price.toLocaleString().replaceAll(",", ".")}
                            <sup>đ</sup>
                        </h1>
                        <p className="reviewItem__description">
                            The Burger Box là một mô hình kinh doanh hoàn toàn
                            mới lạ thuộc vào chuỗi cửa hàng cà phê nổi tiếng
                            nhất nhì Hà Nội. Từ khi những chiếc bánh hamburger
                            được du nhập vào Hà Nội, nó luôn được coi như một
                            món ăn nhanh nhằm để lấp đầy cái dạ dày trống chứ
                            thực sự chẳng hề mang lại bất kỳ trải nghiệm ẩm thực
                            nào. Tuy asd dsad asdasdaj jahsdkj ajahsd ajkhakdak
                            asdh dasd kasdkja kjad asdjad
                        </p>
                        <p className="reviewItem__detail text-sm w-fit hover:main__color  mb-4">
                            <Link to="/collections/detail/watter-bottle">
                                Chi tiết{" "}
                            </Link>
                        </p>
                        <div className="flex">
                            <div className="reviewItem__quantity flex items-center gap-2 border-1 px-4 mr-2 none__copy">
                                <span
                                    onClick={() =>
                                        setQuantity((prev) => {
                                            if (prev > 1) return prev - 1;
                                            return prev;
                                        })
                                    }
                                >
                                    –
                                </span>
                                <p className="w-4 text-center">{quantity}</p>
                                <span onClick={() => setQuantity(quantity + 1)}>
                                    +
                                </span>
                            </div>
                            <button
                                className="main__button"
                                onClick={handlePaymentProduct}
                            >
                                Mua hàng
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ReviewItem;
