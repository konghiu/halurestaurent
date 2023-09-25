import React from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import Container from "../../lauout/container/Container";
import clsx from "clsx";
import { useSelector } from "react-redux";

import noavt from "../../../assets/images/143086968_2856368904622192_1959732218791162458_n.png";
import "./css/index.css";
import { url } from "../../service/APIService";

const accountHtmlRender = [
    {
        id: 1,
        title: "Thông tin cá nhân",
        path: "/halurestaurent/account",
    },
    {
        id: 2,
        title: "Thay đổi mật khẩu",
        path: "/halurestaurent/account/change-password",
    },
    {
        id: 3,
        title: "Đơn hàng của bạn",
        path: "/halurestaurent/account/orders",
    },
    {
        id: 4,
        title: "Danh sách địa chỉ",
        path: "/halurestaurent/account/addresses",
    },
];

const Account = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const user = useSelector((state) => state.userSlice);

    React.useEffect(() => {
        if (!user) navigate("/halurestaurent/sign/sign-in");
    }, [user, navigate]);

    return (
        <Container>
            <div id="account" className="flex rounded-md overflow-hidden">
                <aside>
                    <h3 className="account__username">{user?.username}</h3>
                    <small className="account__email">{user?.email}</small>
                    <div className="account__avt w-10">
                        <img
                            src={
                                user?.avatar
                                    ? `${url}/avatars/${user._id}/${user.avatar}`
                                    : noavt
                            }
                            alt=""
                        />
                    </div>
                    <ul className="account__listpath pt-4">
                        {accountHtmlRender.map((e) => (
                            <li
                                key={e.id}
                                className={clsx({
                                    "account__listpath-choose":
                                        e.path === location.pathname,
                                })}
                            >
                                <Link to={e.path}>{e.title}</Link>
                            </li>
                        ))}
                    </ul>
                </aside>
                <div className="account__outlet">
                    <Outlet
                        context={{
                            title: accountHtmlRender.find(
                                (i) => i.path === location.pathname
                            )?.title,
                            user: user,
                        }}
                    />
                </div>
            </div>
        </Container>
    );
};

export default Account;
