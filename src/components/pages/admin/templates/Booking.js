import React from "react";
import { socket } from "../../../../socket.io/SocketIO";
import { Link } from "react-router-dom";
import Bill from "../../../lauout/bill/Bill";
import { onRequestSetStatusOrder, url } from "../../../service/APIService";
import axios from "axios";
import "../css/admin.css";
import { useDispatch, useSelector } from "react-redux";
import { setNotify } from "../../../../reducers/notificationSlice";

const bookingStatus = {
    queue: "Xác nhận",
    process: "Giao hàng",
    deliver: "Xác nhận đã giao",
    completed: "Xóa đơn hàng",
    cancel: "Xóa đơn hàng",
};

const orderMessageStatus = {
    queue: "đã được xác nhận",
    process: "đang được giao",
    deliver: "đã giao thành công",
};

const nextStatus = {
    queue: "process",
    process: "deliver",
    deliver: "completed",
};

const Booking = () => {
    const [list, setList] = React.useState([]);
    const token = useSelector((state) => state.userSlice)?.accessToken;
    const dispatch = useDispatch();

    React.useEffect(() => {
        let first_load = true;
        socket.on("consumer_order", async (bill, notify) => {
            dispatch(setNotify(notify));
            setList((prev) => [...prev, bill]);
            first_load = false;
        });
        socket.on("order", (receipt) => {
            console.log(receipt);
            setList((prev) => [...prev, receipt]);
            first_load = false;
        });
        socket.on("consumer_cancel_order", (id, notify) => {
            dispatch(setNotify(notify));
            setList((prev) => {
                let arr = [...prev];
                let index = arr.findIndex((item) => item._id === id);
                arr[index].status = "cancel";
                return [...arr];
            });
        });
        if (first_load) {
            axios
                .get(`${url}/booking/status/uncomplete`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then((res) => {
                    if (res.status === 200) {
                        setList(res.data);
                    }
                })
                .catch((err) => console.log(err.response.message));
        }
        return () => {
            socket.off("consumer_order");
            socket.off("consumer_cancel_order");
            socket.off("order");
        };
    }, [socket]);

    const onUpdateStatusInList = (status, id) => {
        setList((prev) => {
            let arr = [...prev];
            const index = arr.findIndex((i) => i._id === id);
            arr[index].status = nextStatus[status];
            return [...arr];
        });
    };

    const handleUpdateStatusBooking = async (item) => {
        const status = item.status;
        const id = item._id;
        const consumerId = item.user;
        const message = `Đơn hàng <b>${item.code}</b> ${orderMessageStatus[status]}`;

        if (status === "completed" || status === "cancel") {
            setList((prev) => {
                let arr = [...prev];
                arr = arr.filter((i) => i._id !== id);
                return [...arr];
            });
            return 0;
        }
        await onRequestSetStatusOrder(nextStatus[status], id, token)
            .then((res) => {
                if (res.status === 200) {
                    onUpdateStatusInList(status, id);
                    socket.emit("update_status_order", {
                        id: id,
                        message: message,
                        userId: consumerId,
                    });
                }
            })
            .catch((err) => {
                alert("Error: " + err.data.message);
            });
    };

    return (
        <div className="center booking">
            <div className="container py-8">
                <div className="flex justify-between">
                    <Link to="/halurestaurent/admin">quay lai</Link>
                    <h1>Booking</h1>
                </div>
                <div className="booking__receipts">
                    {list.map((item) => (
                        <div
                            key={item._id}
                            className={`booking__receipts-item booking__receipts-${item.status}`}
                        >
                            <Bill bill={item} />
                            <button
                                className="w-full text-center bg-white"
                                onClick={(e) => handleUpdateStatusBooking(item)}
                            >
                                {bookingStatus[item.status]}
                            </button>
                            {item.status === "cancel" && (
                                <div className="cancel__warning">
                                    <p>Đơn hàng đã bị hủy</p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Booking;
