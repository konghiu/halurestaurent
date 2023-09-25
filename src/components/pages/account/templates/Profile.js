import React from "react";
import { useOutletContext } from "react-router-dom";
import noavt from "../../../../assets/images/143086968_2856368904622192_1959732218791162458_n.png";
import { url } from "../../../service/APIService";
import UpdateAvatarBox from "./UpdateAvatarBox";

const Profile = () => {
    const outlet = useOutletContext();
    const [openBox, setOpenBox] = React.useState(false);

    return (
        <div className="profile">
            {openBox && (
                <UpdateAvatarBox user={outlet.user} setOpenBox={setOpenBox} />
            )}
            <h3>{outlet.title}</h3>
            <div className="inline-block w-20 float-left mr-4">
                <div>
                    <img
                        src={
                            outlet.user?.avatar
                                ? `${url}/avatars/${outlet.user._id}/${outlet.user.avatar}`
                                : noavt
                        }
                        alt=""
                        onDoubleClick={() => setOpenBox(true)}
                    />
                </div>
                <button
                    className="text-xs py-1"
                    onClick={() => setOpenBox(true)}
                >
                    Cập nhật ảnh
                </button>
            </div>
            <div className="inline-block float-left">
                <small className="block">
                    <b>Họ tên: </b>
                    <span>{outlet.user?.username}</span>
                </small>
                <small className="block mt-2">
                    <b>Email: </b>
                    <span>{outlet.user?.email}</span>
                </small>
            </div>
        </div>
    );
};

export default Profile;
