import React from "react";
import { Link } from "react-router-dom";
import "../css/admin.css";

const Main = () => {
    return (
        <div className="admin__buttons">
            <Link to="booking">Danh sách đơn hàng đang chờ</Link>
            <Link to="">Danh sách đơn hàng đã thanh toán</Link>
            <Link to="">Danh sách sản phẩm</Link>
            <Link to="">Danh sách sách người dùng</Link>
        </div>
    );
};

export default Main;
