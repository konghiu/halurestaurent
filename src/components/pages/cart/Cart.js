import React from "react";
// css
import "./cart.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import ItemCart from "./ItemCart";
import { convertCost } from "../../service/features";
import Container from "../../lauout/container/Container";

const Cart = () => {
    const user = useSelector((state) => state.userSlice);
    const totalPrice = React.useMemo(() => {
        if (!user) return 0;
        if (!user.cart.length) return 0;
        return user.cart.reduce((prev, curr) => {
            return prev + curr.product.price * curr.quantity;
        }, 0);
    }, [user, user?.cart?.length]);

    return (
        <Container>
            <div className="cart">
                <table className="w-full">
                    <thead>
                        <tr>
                            <th>Ảnh sản phẩm</th>
                            <th>Tên sản phẩm</th>
                            <th>Đơn giá</th>
                            <th>Số lượng</th>
                            <th>Thành tiền</th>
                            <th>Xóa</th>
                        </tr>
                    </thead>
                    <tbody>
                        {user?.cart.map((item) => (
                            <ItemCart
                                key={item._id}
                                item={item}
                                token={user.accessToken}
                            />
                        ))}
                    </tbody>
                </table>
                {!user?.cart.length && (
                    <p
                        className="text-sm border-1 py-4 text-center"
                        style={{ borderTop: "none" }}
                    >
                        Khong co san pham nao!
                    </p>
                )}
                <div className="flex justify-between items-start mt-6">
                    <Link
                        className="py-2 px-10 main__bg text-white cursor-pointer"
                        to="/halurestaurent/collections/all"
                    >
                        Tiếp tục mua hàng
                    </Link>
                    <div className="w-2/5">
                        <p className="border-1 mb-6 flex px-4 text-sm">
                            <span className="flex-1 py-2 border-r-1">
                                Tổng tiền thanh toán
                            </span>
                            <span className="w-2/5 py-2 font-bold main__color text-right">
                                {convertCost(totalPrice)}
                                <sup>đ</sup>
                            </span>
                        </p>
                        <Link
                            to="/halurestaurent/payment"
                            className="py-2 main__bg text-white w-full text-center"
                        >
                            Tiến hành thanh toán
                        </Link>
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default Cart;
