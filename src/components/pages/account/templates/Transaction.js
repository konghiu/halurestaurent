import React from "react";
import { useOutletContext } from "react-router-dom";
import { url } from "../../../service/APIService";
import { convertCost, convertDate } from "../../../service/features";
import clsx from "clsx";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { socket } from "../../../../socket.io/SocketIO";
import { setNotify } from "../../../../reducers/notificationSlice";
import { startTransition } from "react";

const transactionHeaders = [
    { id: 1, title: "Chờ xử lý", status: "queue" },
    { id: 2, title: "Đang xử lý", status: "process" },
    { id: 3, title: "Đang giao", status: "deliver" },
    { id: 4, title: "Hoàn thành", status: "completed" },
    { id: 5, title: "Hủy", status: "cancel" },
];

const Transaction = () => {
    const dispatch = useDispatch();
    const outlet = useOutletContext();
    const user = useSelector((state) => state.userSlice);
    const [list, setList] = React.useState([]);
    const [orders, setOrders] = React.useState(transactionHeaders[0]);

    React.useEffect(() => {
        axios
            .get(`${url}/booking/status/${orders.status}`, {
                headers: {
                    Authorization: `Bearer ${user.accessToken}`,
                },
            })
            .then((res) => setList(res.data))
            .catch((err) => console.log(err.response.data));
    }, [orders]);

    React.useEffect(() => {
        socket.on("admin_send_status_order", async (payload) => {
            const id = payload.id;
            const notify = payload.notify;
            startTransition(() => {
                dispatch(setNotify(notify));
            });
            setList((prev) => {
                let arr = [...prev];
                arr = arr.filter((item) => item._id !== id);
                return [...arr];
            });
            return;
        });
        return () => {
            socket.off("admin_send_status_order");
        };
    }, [socket]);

    const handleCancelOrder = (order) => {
        axios
            .put(
                `${url}/booking/cancel`,
                {
                    id: order._id,
                },
                {
                    headers: {
                        Authorization: `Bearer ${user.accessToken}`,
                    },
                }
            )
            .then((res) => {
                dispatch(setNotify(res.data.notify));
                setList((prev) => {
                    return [...prev].filter((item) => item._id !== order._id);
                });
                const payload = {
                    id: order._id,
                    message: `Khách hàng <b>${order.recipient}</b> đã <b>hủy</b> đơn hàng <b>${order.code}</b>`,
                };
                socket.emit("consumer_cancel_order", payload);
            })
            .catch((err) => console.log(err.response.data));
    };

    return (
        <div className="transaction">
            <h3>{outlet.title}</h3>
            <div className="transaction__header grid grid-cols-5 gap-4 mb-4">
                {transactionHeaders.map((item) => (
                    <div
                        key={item.id}
                        className={clsx({
                            "transaction__header-chose":
                                item.status === orders.status,
                        })}
                    >
                        <p>{item.id}</p>
                        <button
                            onClick={() => {
                                setOrders(item);
                            }}
                        >
                            {item.title}
                        </button>
                    </div>
                ))}
            </div>
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>Đơn hàng</th>
                            <th>Ngày</th>
                            <th>Địa chỉ</th>
                            <th>Giá trị đơn hàng</th>
                            <th>TT thanh toán</th>
                        </tr>
                    </thead>
                    <tbody>
                        {list?.map((order) => (
                            <tr className="receipts" key={order._id}>
                                <th>{order.code}</th>
                                <th>
                                    <p>{convertDate(order.updatedAt).date}</p>
                                    <p>{convertDate(order.updatedAt).time}</p>
                                </th>
                                <th>{order.address}</th>
                                <th>{convertCost(order.total)}</th>
                                <th>
                                    <p>
                                        {order.status === "completed"
                                            ? "Đã thanh toán"
                                            : "Chưa thanh toán"}
                                    </p>
                                    {order.status === "queue" && (
                                        <b
                                            onClick={() =>
                                                handleCancelOrder(order)
                                            }
                                            className="cursor-pointer"
                                        >
                                            Hủy đơn
                                        </b>
                                    )}
                                </th>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {!list?.length && (
                    <p
                        className="text-sm border-1 py-4 text-center"
                        style={{ borderTop: "none" }}
                    >
                        Không có sản phẩm nào!
                    </p>
                )}
            </div>
        </div>
    );
};

export default Transaction;
