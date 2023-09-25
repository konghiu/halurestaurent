import React from "react";
import { useDispatch } from "react-redux";
import { updateAvatar } from "../../../../reducers/userSlice";
import { loadingProccess } from "../../../../reducers/loadingSlice";
import axios from "axios";
import { url } from "../../../service/APIService";

const UpdateAvatarBox = ({ user, setOpenBox }) => {
    const dispatch = useDispatch();
    const [avatar, setAvatar] = React.useState({});

    const onChangeAvatar = (target) => {
        if (!target) return;
        const file = target.files[0];
        const preview = URL.createObjectURL(target.files[0]);
        setAvatar({ file: file, preview: preview });
    };

    const onUpdateAvatar = () => {
        if (!avatar.file) {
            alert("Vui lòng chọn ảnh");
            return;
        }
        dispatch(loadingProccess(true));
        const form = new FormData();
        form.append("image", avatar.file);
        form.append("folder", "avatars");
        axios
            .post(`${url}/user/avatar`, form, {
                headers: {
                    Authorization: "Bearer " + user.accessToken,
                },
                 withCredentials: true,
            })
            .then((res) => {
                setTimeout(() => {
                    dispatch(updateAvatar(res.data));
                    setOpenBox(false);
                }, 1000);
            })
            .catch((err) => console.log(err.response.data));
        setTimeout(() => {
            dispatch(loadingProccess(false));
        }, 1000);
    };

    return (
        <div className="z-10 flex items-center justify-center fixed left-0 top-0 h-full w-full">
            <div
                className="banner__black"
                onClick={() => setOpenBox(false)}
            ></div>
            <div className="boxUpdateAvt w-1/2 p-8 bg-white z-10">
                <h3>Cap nhat anh dai dien</h3>
                <div className="boxUpdateAvt__preview">
                    <div
                        className="w-80 h-80 border-1 p-2"
                        style={!avatar.preview ? { display: "none" } : {}}
                    >
                        <img src={avatar.preview} alt="preview avatar" />
                    </div>
                </div>
                <div className="boxUpdateAvt__buttons mt-4 flex gap-4 float-right">
                    <button
                        className="main__button"
                        onClick={() => setOpenBox(false)}
                    >
                        Hủy
                    </button>
                    <label htmlFor="boxAvt" className="main__button">
                        Đổi ảnh
                    </label>
                    <button className="main__button" onClick={onUpdateAvatar}>
                        Cập nhật
                    </button>
                    <input
                        type="file"
                        id="boxAvt"
                        className="hidden"
                        onChange={(e) => onChangeAvatar(e.target)}
                    />
                </div>
            </div>
        </div>
    );
};

export default UpdateAvatarBox;
