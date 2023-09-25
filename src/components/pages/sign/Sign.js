import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Container from "../../lauout/container/Container";
import { useSelector } from "react-redux";

const Sign = () => {
    const navigate = useNavigate();
    const user = useSelector((state) => state.userSlice);

    React.useEffect(() => {
        if (user) {
            navigate(-1) || navigate("/halurestaurent/account");
        }
    }, [user, user?._id]);

    return (
        <Container>
            <Outlet />
        </Container>
    );
};

export default Sign;
