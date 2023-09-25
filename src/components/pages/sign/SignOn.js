import React, { useState } from "react";
import LoginAvailable from "../../forms/LoginAvailable";
import { handleRegisterService } from "../../service/APIService";
import { useDispatch } from "react-redux";
import { loadingProccess } from "../../../reducers/loadingSlice";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

const SignOn = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [warning, setWarning] = useState("");

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        mode: "onSubmit",
        reValidateMode: "onSubmit",
    });

    const onRegister = async (data) => {
        dispatch(loadingProccess(true));
        await handleRegisterService({
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            password: data.password,
        })
            .then((res) => {
                setWarning(res.data.message);
                if (res.status === 200) {
                    navigate("/halurestaurent/sign/sign-in");
                }
                dispatch(loadingProccess(false));
            })
            .catch((err) => {
                dispatch(loadingProccess(false));
                setWarning(err.data.message);
            });
    };

    return (
        <div>
            <React.Fragment>
                <h1 className="font-bold text-lg">ĐĂNG KÝ TÀI KHOẢN</h1>
                <div className="w-full mt-4 mb-10 text-sm">
                    <p>
                        Nếu bạn có tài khoản, đăng nhập{" "}
                        <Link
                            className="underline main__color"
                            to="/halurestaurent/sign/sign-in"
                        >
                            tại đây
                        </Link>
                        .
                    </p>
                    <form
                        onSubmit={handleSubmit(onRegister)}
                        className="grid grid-cols-2 gap-x-10 mt-2"
                    >
                        <div className="input__sign">
                            <label htmlFor="firstName">Họ</label>
                            <input
                                placeholder="Tên"
                                type="text"
                                id="firstName"
                                {...register("firstName", {
                                    required: "Yêu cầu phải nhập họ.",
                                })}
                            />
                            {errors.firstName?.message && (
                                <small>{errors.firstName.message}</small>
                            )}
                        </div>
                        <div className="input__sign">
                            <label htmlFor="lastName">Tên</label>
                            <input
                                placeholder="Tên"
                                type="text"
                                id="lastName"
                                {...register("lastName", {
                                    required: "Yêu cầu phải nhập tên",
                                })}
                            />
                            {errors.lastName?.message && (
                                <small>{errors.lastName.message}</small>
                            )}
                        </div>
                        <div className="input__sign">
                            <label htmlFor="email">Email</label>
                            <input
                                placeholder="Email"
                                type="email"
                                id="email"
                                {...register("email", {
                                    required: "Yêu cầu phải nhập email",
                                })}
                            />
                            {errors.email?.message && (
                                <small>{errors.email.message}</small>
                            )}
                        </div>
                        <div className="input__sign">
                            <label htmlFor="password">Mật khẩu</label>
                            <input
                                placeholder="Mật khẩu"
                                type="password"
                                id="password"
                                {...register("password", {
                                    required: "Yêu cầu phải nhập mật khẩu",
                                })}
                            />
                            {errors.password?.message && (
                                <small>{errors.password.message}</small>
                            )}
                        </div>
                        <div>
                            <button className="px-6 py-2 w-fit main__color border-1 main__border-color hover:main__bg hover:text-white">
                                Đặng ký
                            </button>
                            {warning && (
                                <small className="text-red-500 block">
                                    {warning}
                                </small>
                            )}
                        </div>
                    </form>
                </div>
                <LoginAvailable />
            </React.Fragment>
        </div>
    );
};

export default SignOn;
