import React from "react";
import { useForm } from "react-hook-form";
import { useOutletContext } from "react-router-dom";
import { validatePassword } from "../../../service/features";
import { handleChangePassword } from "../../../service/APIService";
import { useState } from "react";

const ChangePassword = () => {
     const outlet = useOutletContext();
     const [warning, setWarning] = useState();

     const {
          register,
          handleSubmit,
          watch,
          reset,
          formState: { errors },
     } = useForm({
          mode: "onSubmit",
          reValidateMode: "onSubmit",
     });

     const onSubmit = async (data) => {
          const res = await handleChangePassword(data, outlet.user.accessToken);
          if (res.status !== 200)
               return setWarning({
                    message: res.data.message,
                    status: false,
               });
          setWarning({
               message: "Doi mat khau thanh cong.",
               status: true,
          });
          reset();
          setTimeout(() => {
               setWarning(null);
          }, 2000);
     };

     return (
          <div className="changePassword">
               <h3>{outlet.title}</h3>
               <div>
                    <p className="text-sm mb-4">
                         Để đảm bảo tính bảo mật vui lòng đặt mật khẩu với ít
                         nhất 8 kí tự. Ít nhất 1 ký tự thường, 1 ký tự in hoa, 1
                         số. Không chứa ký tự đặc biệt.
                    </p>
                    <form onSubmit={handleSubmit(onSubmit)}>
                         <label htmlFor="oPw">
                              Mật khẩu cũ <span>*</span>
                         </label>
                         <input
                              type="password"
                              id="oPw"
                              {...register("oPw", {
                                   required: "Yeu cau xac minh mat khau cu.",
                              })}
                         />
                         {errors.oPw?.message && (
                              <small className="text-red-500">
                                   {errors.oPw.message}
                              </small>
                         )}
                         <label htmlFor="nPw">
                              Mật khẩu mới <span>*</span>
                         </label>
                         <input
                              type="password"
                              id="nPw"
                              {...register("nPw", {
                                   required: "Yeu cau nhap mat khau moi.",
                                   validate: (value) => validatePassword(value),
                              })}
                         />
                         {errors.nPw?.message && (
                              <small className="text-red-500">
                                   {errors.nPw.message}
                              </small>
                         )}
                         <label htmlFor="cPw">
                              Xác nhận lại mật khẩu <span>*</span>
                         </label>
                         <input
                              type="password"
                              id="cPw"
                              {...register("cPw", {
                                   required:
                                        "Yeu cau xac nhan lai mat khau moi.",
                                   validate: (value) => {
                                        if (value !== watch("nPw"))
                                             return "Mat khau khong tuong xung.";
                                   },
                              })}
                         />
                         {errors.cPw?.message && (
                              <small className="text-red-500">
                                   {errors.cPw.message}
                              </small>
                         )}
                         <button
                              type="submit"
                              className="main__button text-white"
                         >
                              Dat lai mat khau
                         </button>
                         {warning?.message && (
                              <small
                                   style={
                                        warning.status
                                             ? { color: "green" }
                                             : { color: "red" }
                                   }
                              >
                                   {warning.message}
                              </small>
                         )}
                    </form>
               </div>
          </div>
     );
};

export default ChangePassword;
