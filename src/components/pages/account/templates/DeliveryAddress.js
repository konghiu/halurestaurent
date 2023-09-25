import React, { useState } from "react";
import { useOutletContext } from "react-router-dom";
import AddressBox from "./AddressBox";
import axios from "axios";
import { url } from "../../../service/APIService";
import { useDispatch } from "react-redux";
import {
    changeAddressDefault,
    deleteAddress,
} from "../../../../reducers/userSlice";
import { loadingProccess } from "../../../../reducers/loadingSlice";

const DeliveryAddress = () => {
    const dispatch = useDispatch();
    const outlet = useOutletContext();
    const [openBox, setOpenBox] = useState(false);

    const onEndLoading = async () => {
        setTimeout(() => {
            dispatch(loadingProccess(false));
        }, 1500);
    };

    const handleChangeDefaultAddress = async (index) => {
        dispatch(loadingProccess(true));
        await axios
            .post(
                `${url}/user/addresses/default${index}`,
                { data: null },
                {
                    headers: {
                        Authorization: "Bearer " + outlet.user.accessToken,
                    },
                }
            )
            .then((res) => {
                if (res.status === 200) {
                    setTimeout(() => {
                        dispatch(changeAddressDefault(index));
                    }, 1500);
                }
            })
            .catch((err) => console.log(err.response));
        await onEndLoading();
    };

    const handleRemoveAddress = async (id) => {
        dispatch(loadingProccess(true));
        await axios
            .delete(`${url}/user/addresses${id}`, {
                headers: {
                    Authorization: "Bearer " + outlet.user.accessToken,
                },
            })
            .then((res) => {
                if (res.status === 200)
                    setTimeout(() => {
                        dispatch(deleteAddress(id));
                    }, 1500);
            })
            .catch((err) => console.log(err.response));
        await onEndLoading();
    };

    return (
        <React.Fragment>
            {openBox && (
                <AddressBox user={outlet.user} setOpenBox={setOpenBox} />
            )}
            <div className="addresses">
                <h3>{outlet.title}</h3>
                <div>
                    <button
                        className="main__button font-bold"
                        onClick={() => setOpenBox(!openBox)}
                    >
                        Thêm địa chỉ
                    </button>
                </div>
                <div className="list__address">
                    {outlet.user?.addresses?.map((address, index) => (
                        <ul
                            className="flex justify-between items-center w-full"
                            key={address._id}
                        >
                            <div>
                                <li>
                                    <b>Họ tên: </b>
                                    {address.recipient}
                                </li>
                                <li>
                                    <b>Đại chỉ: </b>
                                    {address.address}
                                </li>
                                <li>
                                    <b>Số địa chỉ: </b>
                                    {address.phone}
                                </li>
                            </div>
                            <div>
                                <p className="text-blue-400 cursor-pointer">
                                    Chỉnh sửa
                                </p>
                                <p
                                    className="text-red-400 cursor-pointer"
                                    onClick={() =>
                                        handleRemoveAddress(address._id)
                                    }
                                >
                                    xóa
                                </p>
                                {!!index && (
                                    <p
                                        className="text-green-400 cursor-pointer"
                                        onClick={() =>
                                            handleChangeDefaultAddress(index)
                                        }
                                    >
                                        mặc định
                                    </p>
                                )}
                            </div>
                        </ul>
                    ))}
                </div>
            </div>
        </React.Fragment>
    );
};

export default DeliveryAddress;
