import React from "react";
import LoginAvailable from "../../forms/LoginAvailable";
import { Link } from "react-router-dom";
import { handleLoginService, socketLogin } from "../../service/APIService";
import { useDispatch } from "react-redux";
import { login } from "../../../reducers/userSlice";
import { loadingProccess } from "../../../reducers/loadingSlice";
import { useState } from "react";
import { useForm } from "react-hook-form";

const SignIn = () => {
    const dispatch = useDispatch();

    const [warning, setWarning] = useState("");

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm({
        mode: "onSubmit",
        reValidateMode: "onSubmit",
        defaultValues: {},
    });

    const handleLogin = async (data) => {
        dispatch(loadingProccess(true));
        await handleLoginService(data)
            .then((res) => {
                setTimeout(() => {
                    if (res.status === 200) {
                        dispatch(login(res.data));
                        socketLogin(res.data.admin, res.data._id);
                        setValue();
                    } else setWarning(res.data.message);
                }, 1000);
            })
            .catch((err) => setWarning(err.data.message));
        setTimeout(() => {
            dispatch(loadingProccess(false));
        }, 1000);
    };

    // const onRecoverPassword = (data) => {
    //      console.log(data);
    // };
    return (
        <div>
            <h1 className="font-bold text-lg">ĐĂNG NHẬP TÀI KHOẢN</h1>
            <div className="grid grid-cols-2 gap-10 mt-4 mb-10 text-sm">
                <form onSubmit={handleSubmit(handleLogin)}>
                    <p className="mb-2">
                        Nếu bạn có tài khoản, đăng nhập tại đây.
                    </p>
                    <div className="input__sign">
                        <label htmlFor="email">Email</label>
                        <input
                            placeholder="Email"
                            type="email"
                            id="email"
                            {...register("email", {
                                required: "Ban phai nhap email",
                            })}
                        />
                        {errors.email?.message && (
                            <small>{errors.email.message}</small>
                        )}
                    </div>
                    <div className="input__sign">
                        <label htmlFor="password">Password</label>
                        <input
                            placeholder="Password"
                            type="password"
                            id="password"
                            {...register("password", {
                                required: "Ban phai nhap mat khau",
                            })}
                        />
                        {errors.password?.message && (
                            <small>{errors.password.message}</small>
                        )}
                    </div>
                    <button className="inline px-6 py-2 main__bg text-white border-1 main__border-color mt-4">
                        Đặng nhập
                    </button>
                    <button className="inline px-6 py-2 main__color border-1 main__border-color ml-4 hover:main__bg hover:text-white">
                        <Link to="/halurestaurent/sign/sign-on">Đặng ký</Link>
                    </button>
                    {warning && (
                        <small className="text-red-500 block">{warning}</small>
                    )}
                </form>
                <form>
                    <p className="mb-2">
                        Bạn quên mật khẩu? Nhập địa chỉ email để lấy lại mật
                        khẩu qua email
                    </p>
                    <div className="input__sign">
                        <label htmlFor="recoverPassword">Email</label>
                        <input
                            placeholder="Lay lai mat khau"
                            type="email"
                            id="recoverPassword"
                            {...register("recoverPassword", {})}
                        />
                        {errors.recoverPassword?.message && (
                            <small>{errors.recoverPassword.message}</small>
                        )}
                    </div>
                    <button className="mt-6 px-6 py-2 main__bg text-white border-1 main__border-color">
                        Lấy lại mật khẩu
                    </button>
                </form>
            </div>
            <LoginAvailable />
        </div>
    );
};

export default SignIn;
