import React, { useState } from "react";
import { AiOutlineUser, AiOutlineShoppingCart } from "react-icons/ai";
import { BsFillPencilFill } from "react-icons/bs";
import { MdOutlineDeliveryDining } from "react-icons/md";
import { FaBars, FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { open } from "../../../reducers/searchSlice";
// assets
import logo from "../../../assets/images/logo.webp";
// css
import "./index.css";
import Notification from "../../notification/Notification.js";
import NavigationBar from "./NavigationBar";

const unAuth = [
    {
        id: 1,
        title: "Đăng nhập",
        path: "/halurestaurent/sign/sign-in",
        icon: <AiOutlineUser />,
    },
    {
        id: 2,
        title: "Đăng ký",
        path: "/halurestaurent/sign/sign-on",
        icon: <BsFillPencilFill />,
    },
];

const Header = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.userSlice);

    const [openNav, setOpenNav] = useState(false);

    return (
        <header className="header text-white ">
            <NavigationBar openNav={openNav} setOpenNav={setOpenNav} />
            <div className="header__top center px-10">
                <div className="container">
                    <div className="flex header__user">
                        {!user ? (
                            <React.Fragment>
                                {unAuth.map((e) => (
                                    <React.Fragment key={e.id}>
                                        <li>
                                            {e.icon}
                                            <Link
                                                to={e.path}
                                                className="hover:main__color"
                                            >
                                                {e.title}
                                            </Link>
                                        </li>
                                        {e.id < unAuth.length && <span>|</span>}
                                    </React.Fragment>
                                ))}
                            </React.Fragment>
                        ) : (
                            <React.Fragment>
                                <li>
                                    <AiOutlineUser />
                                    <Link
                                        to="/halurestaurent/account"
                                        className="hover:main__color"
                                    >
                                        {user.username}
                                    </Link>
                                </li>
                                <span>|</span>
                                <li>
                                    <Link
                                        className="hover:main__color"
                                        to="/halurestaurent/sign/sign-out"
                                    >
                                        Đăng xuất
                                    </Link>
                                </li>
                            </React.Fragment>
                        )}
                    </div>
                    <div className="flex items-center">
                        <MdOutlineDeliveryDining className="icon__delivery" />
                        <div>
                            <p className="text-xs">Gọi ngay</p>
                            <h3 className="text-xl font-medium main-tx">
                                1900 0000
                            </h3>
                        </div>
                    </div>
                </div>
            </div>
            <div className="header__logo cursor-pointer">
                <Link to="/halurestaurent/home">
                    <img src={logo} alt="logo" />
                </Link>
            </div>
            <div className="header__bottom center py-1">
                <div className="container">
                    <div className="header__bottom-1">
                        <FaBars
                            className="text-xl"
                            onClick={() => setOpenNav(true)}
                        />
                        <span className="font-light mx-4">|</span>
                        <Notification />
                    </div>
                    <div>
                        <FaSearch
                            className="text-xl"
                            onClick={() => dispatch(open())}
                        />
                        <span className="font-light mx-4">|</span>
                        <span>
                            <Link to="/halurestaurent/cart">
                                <AiOutlineShoppingCart className="text-4xl" />
                            </Link>
                            <span></span>
                        </span>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
