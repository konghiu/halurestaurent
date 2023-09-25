import React, { useRef } from "react";
import { IoIosNotificationsOutline } from "react-icons/io";
import { Link, useLocation } from "react-router-dom";
import { socket } from "../../socket.io/SocketIO";
import { useDispatch, useSelector } from "react-redux";
import {
    setCountNotify,
    setNotify,
    updateNotify,
} from "../../reducers/notificationSlice";
import "./notification.css";

const Notification = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const user = useSelector((state) => state.userSlice);
    const notification = useSelector((state) => state.notificationSlice);
    const list = [...notification.list].reverse();
    const notify_list = useRef();

    React.useEffect(() => {
        socket.on("send_notify", async (payload) => {
            dispatch(setNotify(payload));
        });
    }, [socket]);

    const onOpenNotifyList = () => {
        if (notification.count > 0) {
            dispatch(setCountNotify(-notification.count));
            socket.emit(
                "notification_checked",
                user._id,
                notification.list.length - notification.count
            );
        }
        notify_list.current.style.display = "block";
        let count = 0;
        document.body.onclick = (e) => {
            if (count === 1) {
                notify_list.current.style.display = "none";
                dispatch(updateNotify());
            }
            count = 1;
        };
    };

    return (
        <React.Fragment>
            <Link
                to={
                    user?.admin
                        ? "/halurestaurent/admin/booking"
                        : location.pathname
                }
                className="notify__admin relative"
                onClick={onOpenNotifyList}
            >
                <IoIosNotificationsOutline className="text-3xl" />
                {notification.count > 0 && (
                    <small className="text-red-500 absolute -top-2">
                        {notification.count > 9 ? "9+" : notification.count}
                    </small>
                )}
            </Link>
            <div className="notify__list" ref={notify_list}>
                {list.length > 0 ? (
                    list.map((note) => (
                        <p
                            key={note._id}
                            className={
                                note.checked
                                    ? "notify__checked"
                                    : "notify__unchecked"
                            }
                            dangerouslySetInnerHTML={{
                                __html: note.message,
                            }}
                        />
                    ))
                ) : (
                    <p>Không có thông báo nào.</p>
                )}
            </div>
        </React.Fragment>
    );
};

export default Notification;
