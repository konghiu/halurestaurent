import React from "react";
import { useDispatch } from "react-redux";
import { addCart } from "../../../reducers/productSlice";
import "./item.css";
import { FaShoppingCart } from "react-icons/fa";
import { AiFillCloseSquare } from "react-icons/ai";
import { handleAddCartService, url } from "../../service/APIService";
import { updateCart } from "../../../reducers/userSlice";
import { useNavigate } from "react-router-dom";

const AddItemCart = ({ item, user }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [quantity, setQuantity] = React.useState(1);

    const totalPrice = React.useMemo(() => {
        return (item.price * quantity).toLocaleString().replaceAll(",", ".");
    }, [quantity, item.price]);

    const handleChangeQuantity = (type = "cong") => {
        if (type === "tru") {
            setQuantity((prev) => {
                if (prev > 1) return prev - 1;
                return prev;
            });
        } else setQuantity(quantity + 1);
    };

    const handlePaymentProduct = () => {
        dispatch(addCart(null));
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

    const handleAddItemInCart = async () => {
        if (!user) return alert("chua dang nhap");
        let payload = {
            ...item,
            quantity: quantity,
        };
        const accessToken = user.accessToken;
        const data = await handleAddCartService(payload, accessToken);
        dispatch(updateCart(data));
        dispatch(addCart(null));
    };

    return (
        <section className="z-10 container-buyItem center fixed left-0 top-0 h-full w-full">
            <span
                onClick={() => dispatch(addCart(undefined))}
                className="fixed left-0 top-0 h-full w-full bg-black bg-opacity-30"
            ></span>
            <div className="buyItem container h-fit px-20 pt-10 z-10">
                <div className="border-2 main__border-color rounded-md relative px-4 py-8 bg-white">
                    <AiFillCloseSquare
                        onClick={() => dispatch(addCart(undefined))}
                        className="absolute cursor-pointer right-2 top-2 text-4xl main__color hover:opacity-50"
                    />
                    <h1>
                        <FaShoppingCart className="main__color mr-2" />
                        <span className="font-bold">
                            Giỏ hàng của bạn (x sản phẩm)
                        </span>
                    </h1>
                    <table className="buyItem__table w-full border-1 my-4">
                        <thead>
                            <tr>
                                <th>SẢN PHẨM</th>
                                <th>ĐƠN GIÁ</th>
                                <th>SỐ LƯỢNG</th>
                                <th>THÀNH TIỀN</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th>
                                    <div className="flex gap-5">
                                        <div className="table__image inline border-1 p-1">
                                            <img
                                                className="w-24"
                                                src={`${url}/images/${item.image}`}
                                                alt=""
                                            />
                                        </div>
                                        <p className="font-bold text-black">
                                            {item.name}
                                        </p>
                                    </div>
                                </th>
                                <th>
                                    <p className="">
                                        {item.price
                                            .toLocaleString()
                                            .replaceAll(",", ".")}
                                        <sup>đ</sup>
                                    </p>
                                </th>
                                <th>
                                    <div className="flex justify-center mx-auto text-black none__copy">
                                        <span
                                            className="w-8 py-1 border-1 cursor-pointer"
                                            onClick={() =>
                                                handleChangeQuantity("tru")
                                            }
                                        >
                                            –
                                        </span>
                                        <p className="w-8 py-1 text-center border-1">
                                            {quantity}
                                        </p>
                                        <span
                                            className="w-8 py-1 border-1 cursor-pointer"
                                            onClick={() =>
                                                handleChangeQuantity()
                                            }
                                        >
                                            +
                                        </span>
                                    </div>
                                </th>
                                <th>
                                    <p>
                                        {totalPrice}
                                        <sup>đ</sup>
                                    </p>
                                </th>
                            </tr>
                        </tbody>
                    </table>
                    <p className="inline text-xs">
                        Giao hàng trong nội thành TP. Hồ Chính Minh
                    </p>
                    <p className="inline font-medium float-right">
                        Thành tiền:
                        <span className="main__color ml-2">
                            {totalPrice}
                            <sup>đ</sup>
                        </span>
                    </p>
                    <div className="flex justify-end gap-5 mt-4">
                        <button
                            className="main__button"
                            onClick={handleAddItemInCart}
                        >
                            Thêm vào giỏ hàng
                        </button>
                        <button
                            className="main__button"
                            onClick={handlePaymentProduct}
                        >
                            Thanh toán
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AddItemCart;
