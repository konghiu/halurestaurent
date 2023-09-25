import React, { useEffect, useState } from "react";
import Category from "../../../lauout/category/Category";

// image
import aside_banner from "../../../../assets/images/aside_banner.webp";
import "./index.css";
import Slider from "react-slick";
import Product from "../../../lauout/item/Product";
import { useNavigate, useParams } from "react-router-dom";
import { handleSearchProduct, url } from "../../../service/APIService";
import { convertCost } from "../../../service/features";
import { useSelector } from "react-redux";

const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
};

const Detail = () => {
    const params = useParams();

    const [detailProduct, setDetailProduct] = useState();
    const [quantity, setQuantity] = useState(1);

    const user = useSelector((state) => state.userSlice);
    const navigate = useNavigate();
    const [sameProduct, setSameProduct] = useState([]);
    const [likeProduct, setLikeProduct] = useState([]);

    useEffect(() => {
        const promise = handleSearchProduct(params.slug);
        promise.then((data) => {
            setDetailProduct(data[0]);
        });
    }, [params.slug]);

    const onUpdateQuantity = (amount) => {
        setQuantity((prev) => {
            const newQuantity = prev + amount;
            if (newQuantity < 1) return 1;
            return newQuantity;
        });
    };

    const handlePaymentProduct = () => {
        if (!user) {
            alert("Ban can dang nhap.");
            return navigate("/halurestaurent/sign/sign-in");
        }
        const payment = {
            product: { ...detailProduct },
            quantity: quantity,
            _id: 1,
        };
        localStorage.setItem("paymentProduct", JSON.stringify(payment));
        navigate("/halurestaurent/payment");
    };

    return (
        <React.Fragment>
            <aside className="detail__aside">
                <Category />
                <div className="my-8">
                    <h1 className="main__bg font-bold rounded-t-md text-white py-2 px-3">
                        CÓ THỂ BẠN SẼ THÍCH
                    </h1>
                    <ul className="px-4 py-1 border-1 rounded-b-md border-t-0">
                        {likeProduct.map((item, index) => (
                            <li
                                key={item.id}
                                className="flex py-2 border-b-1 items-start"
                                style={index === 4 ? { border: "none" } : {}}
                            >
                                <div className="w-16">
                                    <img
                                        src={`${url}/images/${item.image}`}
                                        alt=""
                                    />
                                </div>
                                <div className="text-sm ml-2 font-bold">
                                    <p className="cursor-pointer hover:main__color">
                                        {item.name}
                                    </p>
                                    <p className="main__color">
                                        {item.price
                                            .toLocaleString()
                                            .replaceAll(",", ".")}
                                        <sup>đ</sup>
                                    </p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
                <img src={aside_banner} alt="" />
            </aside>
            <div className="detail__item flex-1 ml-10">
                {detailProduct && (
                    <>
                        <div className="inline-block">
                            <img
                                src={`${url}/images/${detailProduct.image}`}
                                alt=""
                            />
                        </div>
                        <div>
                            <h1 className="w-fit font-bold text-2xl">
                                {detailProduct.name}
                            </h1>
                            <div className="my-4 flex text-sm">
                                <p>
                                    Thương hiệu:{" "}
                                    <span className="main__color">Chưa có</span>
                                </p>
                                <span className="mx-4">|</span>
                                <p>
                                    Trạng thái:{" "}
                                    <span className="main__color">
                                        {detailProduct.quantity > 0
                                            ? "Còn hàng"
                                            : "Hết hàng"}
                                    </span>
                                </p>
                            </div>
                            <h2 className="main__color font-bold text-2xl">
                                {convertCost(detailProduct.price)}
                                <sup>đ</sup>
                            </h2>
                            <div className="flex text-sm mt-6">
                                <div className="none__copy flex items-center font-bold gap-2 border-1 px-4 mr-4">
                                    <span
                                        className="cursor-pointer px-2"
                                        onClick={() => onUpdateQuantity(-1)}
                                    >
                                        –
                                    </span>
                                    <p className="w-4 text-center">
                                        {quantity}
                                    </p>
                                    <span
                                        className="cursor-pointer px-2"
                                        onClick={() => onUpdateQuantity(1)}
                                    >
                                        +
                                    </span>
                                </div>
                                <button
                                    className="main__bg text-white py-2 px-4"
                                    onClick={handlePaymentProduct}
                                >
                                    Mua hàng
                                </button>
                            </div>
                        </div>
                    </>
                )}
                <div>
                    <div className="flex gap-8 border-b-1 mt-4 font-bold text-sm">
                        <button className="main__color pb-1 border-b-2 main__border-color">
                            THÔNG TIN SẢN PHẨM
                        </button>
                        <button className="pb-1">CHÍNH SÁCH</button>
                    </div>
                    <p className="my-8 leading-6 text-sm">
                        The Burger Box là một mô hình kinh doanh hoàn toàn mới
                        lạ thuộc vào chuỗi cửa hàng cà phê nổi tiếng nhất nhì Hà
                        Nội. Từ khi những chiếc bánh hamburger được du nhập vào
                        Hà Nội, nó luôn được coi như một món ăn nhanh nhằm để
                        lấp đầy cái dạ dày trống chứ thực sự chẳng hề mang lại
                        bất kỳ trải nghiệm ẩm thực nào. Tuy nhiên, hamburger tại
                        The Burger Box lại là một màu sắc hoàn toàn khác. Bằng
                        đôi bàn tay khéo léo của những đầu bếp tâm huyết, The
                        Burger Box cam kết cung cấp những chiếc hamburger số 1
                        Hà Nội với lớp vỏ bánh mềm chưa từng thấy, vàng óng bắt
                        mắt, kẹp giữa phần nhân sáng tạo và đậm đà hương vị. The
                        Burger Box sẽ phục vụ khách hàng Hà Nội với một thực đơn
                        gồm 7 loại hamburger được chế biến với từng công thức
                        riêng biệt mà bạn chắc chắn sẽ không thể tìm thấy chiếc
                        thứ hai ở bất cứ nhà hàng nào khác.
                    </p>
                </div>
                <div className="">
                    <h1 className="text-center mt-12 mb-8 font-bold text-2xl">
                        SẢN PHẨM CÙNG LOẠI
                    </h1>
                    <Slider {...settings} className="asd">
                        {sameProduct.map((item) => (
                            <Product
                                item={item}
                                // layout={0}
                                key={item.id}
                            />
                        ))}
                    </Slider>
                </div>
            </div>
        </React.Fragment>
    );
};

export default Detail;
