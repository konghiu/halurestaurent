import React from "react";
import { CiLocationOn } from "react-icons/ci";
import { Link } from "react-router-dom";
import {
    AiFillFacebook,
    AiOutlineInstagram,
    AiOutlineTwitter,
} from "react-icons/ai";
import ReceiveNote from "./ReceiveNote.js";

import logo from "../../../assets/images/logo.webp";
import navigationBar from "../../common/navigationBar";
import "./footer.css";

const Footer = () => {
    return (
        <React.Fragment>
            <ReceiveNote />
            <section id="footer" className="center flex-col items-center">
                <div className="footer__logo">
                    <Link to="/halurestaurent/home" className="">
                        <img src={logo} alt="" className="w-36" />
                    </Link>
                </div>
                <div className="container flex gap-10 mt-12">
                    <div className="w-2/5">
                        <h1>Hệ thống cưa hàng</h1>
                        <h2>
                            <CiLocationOn className="text-red-500 text-2xl mr-2" />
                            <span>HALU Gò Vấp</span>
                        </h2>
                        <p>
                            Địa chỉ: 100 Phan Văn Trị, Phường 5, Gò Vấp, TP. Hồ
                            Chí Minh
                        </p>
                        <span>Hotline: 0392534842</span>
                    </div>
                    <div className="flex-1">
                        <h1>Chính sách</h1>
                        <ul>
                            {navigationBar.map((nav) => (
                                <li
                                    key={nav.id}
                                    className="block hover:underline hover:ml-2 transition-all my-2 w-fit"
                                >
                                    <Link to={nav.url}>{nav.title}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="w-1/3">
                        <h1>Kết nối với chung tôi</h1>
                        <ul className="text-3xl">
                            <AiFillFacebook />
                            <AiOutlineInstagram className="mx-5" />
                            <AiOutlineTwitter />
                        </ul>
                    </div>
                </div>
            </section>
        </React.Fragment>
    );
};

export default Footer;
