import React from "react";
import { BsTrash } from "react-icons/bs";
import { handleRemoveOutCart, url } from "../../service/APIService";
import { useDispatch } from "react-redux";
import { setQuanityInCart, updateCart } from "../../../reducers/userSlice";
import { convertCost } from "../../service/features";
import { Link } from "react-router-dom";
import axios from "axios";

const ItemCart = ({ item, token }) => {
    const dispatch = useDispatch();

    const totalPrice = React.useMemo(() => {
        let total = item.product.price * item.quantity;
        return convertCost(total);
    }, []);

    const handleRemove = async () => {
        const res = await handleRemoveOutCart(item._id, token);
        if (res.status === 200) dispatch(updateCart(res.data));
    };

    const handleSetQuanityItemInCart = async (item, quantity) => {
        const newQuantity = item.quantity + quantity;
        if (newQuantity < 1) return;
        await axios
            .put(
                `${url}/user/cart/set-quantity-item${item._id}`,
                { quantity: newQuantity },
                {
                    headers: {
                        Authorization: "Bearer " + token,
                    },
                }
            )
            .then((res) => {
                dispatch(
                    setQuanityInCart({
                        id: item._id,
                        quantity: newQuantity,
                    })
                );
            })
            .catch((err) => console.log(err.response.data.message));
    };

    return (
        <tr>
            <th className="table__image">
                <div>
                    <img src={`${url}/images/${item.product.image}`} alt="" />
                </div>
            </th>
            <th>
                <Link
                    to={`/halurestaurent/collections/detail/${item.product.slug}`}
                >
                    {item.product.name}
                </Link>
            </th>
            <th>
                <p>
                    {convertCost(item.product.price)}
                    <sup>đ</sup>
                </p>
            </th>
            <th className="table__quantity">
                <div className="flex justify-center none__copy">
                    <span onClick={() => handleSetQuanityItemInCart(item, -1)}>
                        -
                    </span>
                    <span>{item.quantity}</span>
                    <span onClick={() => handleSetQuanityItemInCart(item, 1)}>
                        +
                    </span>
                </div>
            </th>
            <th>
                <p>
                    {totalPrice}
                    <sup>đ</sup>
                </p>
            </th>
            <th>
                <BsTrash
                    className="cursor-pointer hover:main__color"
                    onClick={() => handleRemove(item._id)}
                />
            </th>
        </tr>
    );
};

export default ItemCart;
