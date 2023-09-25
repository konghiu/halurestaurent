import React from "react";
import "./payment.css";
import { BsFillWalletFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { convertCost } from "../../service/features";
import { useForm } from "react-hook-form";
import { handleOrder } from "../../service/APIService";
import { useMemo } from "react";
import { updateCart } from "../../../reducers/userSlice";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { socket } from "../../../socket.io/SocketIO";
import { setNotify } from "../../../reducers/notificationSlice";
import { useState } from "react";

const Payment = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state) => state.userSlice);
    const [warning, setWarning] = useState("");

    const [cart, setCart] = React.useState(() => {
        const item = JSON.parse(localStorage.getItem("paymentProduct"));
        if (item) return [item];
        return [];
    });

    useEffect(() => {
        if (!user) navigate("/halurestaurent/sign/sign-in");
        if (!user?.cart.length && !cart?.length)
            navigate("/halurestaurent/cart");
        else if (!cart?.length) setCart(user?.cart);
        return () => {
            localStorage.removeItem("paymentProduct" || null);
        };
    }, []);

    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm({
        reValidateMode: "onSubmit",
        mode: "onsubmit",
        defaultValues: {
            method: "cash",
            username: user?.addresses[0]?.recipient || user?.username,
            address: user?.addresses[0]?.address.split(", ")[0],
            ward: user?.addresses[0]?.address.split(", ")[1],
            district: user?.addresses[0]?.address.split(", ")[2],
            phone: user?.addresses[0]?.phone,
        },
    });

    const totalPrice = useMemo(() => {
        return cart?.reduce((prev, curr) => {
            return prev + curr.quantity * curr.product.price;
        }, 0);
    }, [cart]);

    const onSubmit = async (data) => {
        if (data.method === "credit") {
            setWarning("Tính năng này chưa được hỗ trợ");
            return 0;
        }
        const address = `${data.address}, ${data.ward}, ${data.district}, TP. Ho Chi Minh`;

        const cartPayment = cart.map((item) => {
            return {
                _id: item.product._id,
                name: item.product.name,
                price: item.product.price,
                quantity: item.quantity,
            };
        });
        const payload = {
            recipient: data.username,
            address: address,
            phone: data.phone,
            total: totalPrice,
            category: cartPayment,
        };
        const res = await handleOrder(payload, user.accessToken);
        if (res.status === 200) {
            const bill = res.data.bill;
            dispatch(updateCart([]));
            dispatch(setNotify(res.data.notify));
            navigate("/halurestaurent/account/orders");
            socket.emit("order", res.data.bill, {
                message: `Khách hàng <b>${bill.recipient}</b> đã tạo đơn hang <b>${bill.code}</b>`,
                user: bill.user,
            });
        } else alert(res.data.messages);
    };

    return (
        <div className="center py-8">
            <div className="container">
                <div id="payment">
                    <div className="mb-6 text-center">
                        <BsFillWalletFill />
                        <h2>Thanh toán</h2>
                        <p className="lead">
                            Vui lòng kiểm tra thông tin Khách hàng, thông tin
                            Giỏ hàng trước khi Đặt hàng.
                        </p>
                    </div>
                    <div className="flex gap-8">
                        <form
                            className="flex-1 payment__consumer"
                            onSubmit={handleSubmit(onSubmit)}
                        >
                            <h3 className="text-muted">Thông tin khách hàng</h3>
                            <div className="mb-4">
                                <div className="">
                                    <label htmlFor="username">Họ tên</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="username"
                                        id="username"
                                        placeholder="Ho ten"
                                        {...register("username", {
                                            required:
                                                "Your must fill your name",
                                        })}
                                    />
                                    {errors.username?.message && (
                                        <small className="input__error">
                                            {errors.username.message}
                                        </small>
                                    )}
                                </div>
                                <div className="">
                                    <label>Tinh/Thanh</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value="TP. Ho Chi Minh"
                                        readOnly
                                    />
                                </div>
                                <div className="">
                                    <label htmlFor="district">Quan/Huyen</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="district"
                                        placeholder="Quan/Huyen"
                                        {...register("district", {
                                            required:
                                                "Your must fill your district",
                                        })}
                                    />
                                    {errors.district?.message && (
                                        <small className="input__error">
                                            {errors.district.message}
                                        </small>
                                    )}
                                </div>
                                <div className="">
                                    <label htmlFor="ward">Phuong</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="ward"
                                        placeholder="Phuong"
                                        {...register("ward", {
                                            required:
                                                "Your must fill your ward",
                                        })}
                                    />
                                    {errors.ward?.message && (
                                        <small className="input__error">
                                            {errors.ward.message}
                                        </small>
                                    )}
                                </div>
                                <div className="">
                                    <label htmlFor="address">Địa chỉ</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="address"
                                        placeholder="Dia chi"
                                        {...register("address", {
                                            required:
                                                "Your must fill your address",
                                        })}
                                    />
                                    {errors.address?.message && (
                                        <small className="input__error">
                                            {errors.address.message}
                                        </small>
                                    )}
                                </div>
                                <div className="">
                                    <label htmlFor="phone">Điện thoại</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="phone"
                                        placeholder="So dien thoai"
                                        {...register("phone", {
                                            required:
                                                "Your must fill your phone number",
                                        })}
                                    />
                                    {errors.phone?.message && (
                                        <small className="input__error">
                                            {errors.phone.message}
                                        </small>
                                    )}
                                </div>
                            </div>
                            <h3 className="text-muted">Hình thức thanh toán</h3>
                            <div className="d-block my-3">
                                <div className="flex gap-3">
                                    <input
                                        id="cash"
                                        type="radio"
                                        value="cash"
                                        {...register("method")}
                                    />
                                    <label htmlFor="cash">Tiền mặt</label>
                                </div>
                                <div className="flex gap-3">
                                    <input
                                        id="credit"
                                        type="radio"
                                        value="credit"
                                        {...register("method")}
                                    />
                                    <label htmlFor="credit">Chuyển khoản</label>
                                </div>
                            </div>
                            <hr className="mb-4" />
                            <button
                                className="main__button"
                                type="submit"
                                name="btnDatHang"
                            >
                                Đặt hàng
                            </button>
                            <small className="text-red-500 block">
                                {warning}
                            </small>
                        </form>
                        <div className="w-2/5">
                            <h3 className="flex justify-between items-center mb-4">
                                <span className="text-muted">Giỏ hàng</span>
                                <span className="badge badge-secondary badge-pill">
                                    2
                                </span>
                            </h3>
                            <ul className="payment__list mb-4">
                                {cart?.map((item) => (
                                    <li
                                        className="payment__item flex justify-between items-center "
                                        key={item._id}
                                    >
                                        <div>
                                            <h5 className="my-0 font-bold">
                                                {item.product.name}
                                                <small className="input__error">
                                                    {item.quantity > 1 &&
                                                        ` x ${item.quantity}`}
                                                </small>
                                            </h5>
                                        </div>
                                        <span className="">
                                            {convertCost(
                                                item.product.price *
                                                    item.quantity
                                            )}
                                        </span>
                                    </li>
                                ))}
                                <li className=" flex justify-between items-center ">
                                    <span>Tổng thành tiền</span>
                                    <strong>{convertCost(totalPrice)}</strong>
                                </li>
                            </ul>
                            <div className="payment__voucher">
                                <input
                                    type="text"
                                    readOnly
                                    placeholder="Tính năng đang được cập nhật"
                                    // placeholder="Mã khuyến mãi"
                                />
                                <button>Xác nhận</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Payment;
