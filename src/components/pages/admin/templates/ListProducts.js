import React from "react";
import { BsPencilSquare } from "react-icons/bs";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const ListProducts = () => {
    const product = useSelector((state) => state.productSlice);

    const [listRemove, setListRemove] = React.useState([]);

    const handleAddListRemove = (id) => {
        setListRemove((prev) => {
            if (prev.includes(id)) return prev.filter((it) => it !== id);
            return [...prev, id];
        });
    };

    return (
        <div className="adminList">
            <table className="adminList__table">
                <thead>
                    <tr>
                        <th>Chọn</th>
                        <th>Hình ảnh</th>
                        <th>Tên sản phẩm</th>
                        <th>Đơn giá</th>
                        <th>Lượt xem</th>
                        <th>Trong kho</th>
                        <th>Đã bán</th>
                        <th>Phân loại</th>
                        <th className="text-transparent">thay doi</th>
                    </tr>
                </thead>
                <tbody>
                    {product.list.map((item) => (
                        <tr className="" key={item.id}>
                            <th>
                                <input
                                    type="checkbox"
                                    onChange={() =>
                                        handleAddListRemove(item.id)
                                    }
                                />
                            </th>
                            <th className="table__image">
                                <div>
                                    <img
                                        src={`http://localhost:8000${item.image}`}
                                        alt=""
                                    />
                                </div>
                            </th>
                            <th>
                                <div>
                                    <div className="flex flex-col items-start pl-8">
                                        <h2 className="font-bold">
                                            {item.name}
                                        </h2>
                                        <p>{item.date_pub}</p>
                                    </div>
                                </div>
                            </th>
                            <th>
                                <p>
                                    {item.price
                                        .toLocaleString()
                                        .replaceAll(",", ".")}
                                    <sup>đ</sup>
                                </p>
                            </th>
                            <th>
                                <p>{item.views || 0}</p>
                            </th>
                            <th>
                                <p>{item.quantity}</p>
                            </th>
                            <th>
                                <p>{item.sold || 0}</p>
                            </th>
                            <th>
                                <p>{item.classify}</p>
                            </th>
                            <th>
                                <BsPencilSquare className="cursor-pointer" />
                            </th>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Link
                to="/account/insert"
                className="py-2 px-4 main__bg rounded-sm mt-4 text-white"
            >
                Thêm sản phẩm
            </Link>
        </div>
    );
};

export default ListProducts;
