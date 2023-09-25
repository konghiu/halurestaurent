import React from "react";
import { useEffect } from "react";
import { handleSignOut } from "../../service/APIService";
import { useDispatch } from "react-redux";
import { login } from "../../../reducers/userSlice";
import { clearNotify } from "../../../reducers/notificationSlice";

const SignOut = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        handleSignOut()
            .then((res) => {
                if (res.status === 200) {
                    dispatch(clearNotify());
                    dispatch(login(null));
                }
            })
            .catch((err) => console.log(err));
    }, []);
    return <div></div>;
};

export default SignOut;
