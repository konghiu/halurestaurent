import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { url } from "../../../service/APIService";
import { useDispatch } from "react-redux";
import { insertAddress } from "../../../../reducers/userSlice";

const AddressBox = ({ user, setOpenBox }) => {
    const dispatch = useDispatch();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        mode: "onSubmit",
        reValidateMode: "onSubmit",
        defaultValues: {
            recipient: user?.username,
            phone: user?.addresses[0]?.phone,
        },
    });

    const onsubmit = async (data) => {
        const payload = {
            address: `${data.address}, ${data.ward}, ${data.district}, TP. Ho Chi Minh`,
            phone: data.phone,
            recipient: data.recipient,
        };
        await axios
            .post(`${url}/user/addresses`, payload, {
                headers: {
                    Authorization: "Bearer " + user.accessToken,
                },
            })
            .then((res) => {
                dispatch(insertAddress(res.data));
                setOpenBox(false);
            })
            .catch((err) => console.log(err.response.data.message));
    };

    return (
        <div className="z-10 flex items-center justify-center fixed left-0 top-0 h-full w-full">
            <div
                className="banner__black"
                onClick={() => setOpenBox(false)}
            ></div>
            <div className="addressBox">
                <h3 className="font-bold">THÊM ĐỊA CHỈ MỚI</h3>
                <form onSubmit={handleSubmit(onsubmit)}>
                    <input
                        type="text"
                        placeholder="Họ tên"
                        {...register("recipient", {
                            required: "Yều cầu nhập họ tên",
                        })}
                    />
                    {errors.recipient?.message && (
                        <small>{errors.recipient.message}</small>
                    )}
                    <input
                        type="number"
                        placeholder="Số điện thoại"
                        {...register("phone", {
                            required: "Yều cầu nhập số điện thoại",
                        })}
                    />
                    {errors.phone?.message && (
                        <small>{errors.phone.message}</small>
                    )}
                    <input
                        type="text"
                        placeholder="Dia chi"
                        {...register("address", {
                            required: "Yều cầu nhập địa chỉ",
                        })}
                    />
                    {errors.address?.message && (
                        <small>{errors.address.message}</small>
                    )}
                    <input value="Việt Nam" readOnly />
                    <div className="form__address">
                        <div>
                            <input value="TP. Hồ Chí Minh" readOnly />
                        </div>
                        <div>
                            <input
                                type="text"
                                placeholder="Quận/Huyện"
                                {...register("district", {
                                    required: "Yều cầu nhập quận/huyện",
                                })}
                            />
                            {errors.district?.message && (
                                <small>{errors.district.message}</small>
                            )}
                        </div>
                        <div>
                            <input
                                placeholder="Phường/Xã"
                                type="text"
                                {...register("ward", {
                                    required: "Yều cầu nhập phường/xã",
                                })}
                            />
                            {errors.ward?.message && (
                                <small>{errors.ward.message}</small>
                            )}
                        </div>
                    </div>
                    <input
                        type="checkbox"
                        id="default"
                        className="inline-block mr-2"
                    />
                    <label htmlFor="default">Làm địa chỉ mặc định ?</label>
                    <div className="form__buttons flex gap-4 justify-end w-full">
                        <button onClick={() => setOpenBox(false)}>Huy</button>
                        <button className="main__button text-white">
                            THÊM ĐỊA CHỈ
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddressBox;
