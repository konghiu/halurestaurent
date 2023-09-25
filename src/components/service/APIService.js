import axios from "axios";
import { socket } from "../../socket.io/SocketIO";

export const url = "https://server-halurestaurent.vercel.app";
// export const url = "http://localhost:8000";

export const handleRefreshToken = async (token) => {
    return await axios
        .post(
            `${url}/v/auth/refresh-token`,
            { data: null },
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            }
        )
        .then((res) => res)
        .catch((err) => err.response);
};

export const handleLoginService = async (request) => {
    return axios
        .post(`${url}/v/auth/sign-in`, request, {
            withCredentials: true,
        })
        .then((res) => res)
        .catch((err) => err.response);
};

export const handleSignOut = async () => {
    return await axios
        .post(
            `${url}/v/auth/sign-out`,
            { data: null },
            {
                withCredentials: true,
            }
        )
        .then((res) => res)
        .catch((err) => err.response);
};

export const handleRegisterService = async (res) => {
    const request = {
        ...res,
        username: `${res.firstName} ${res.lastName}`,
    };
    return await axios
        .post(`${url}/v/auth/sign-up`, request, {
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then((res) => res)
        .catch((err) => err.response);
};

export const handleChangePassword = async (request, token) => {
    return await axios
        .post(`${url}/user/change-password`, request, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .then((res) => res)
        .catch((err) => err.response);
};

export const handleAddCartService = async (item, accessToken) => {
    let response = [];
    await fetch(`${url}/category/add-cart`, {
        method: "POST",
        body: JSON.stringify(item),
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
        },
    })
        .then((res) => res.json())
        .then((res) => (response = res));
    return [...response];
};

export const handleGetCategory = async (page, sort, type, max, min) => {
    return await axios
        .get(
            `${url}/category/${page}?sort=${sort}&type=${type}&max=${max}&min=${min}`,
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        )
        .then((res) => res)
        .catch((err) => err.response);
};

export const handleSearchProduct = async (regex) => {
    let response;
    await fetch(`${url}/category/` + regex, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then((res) => res.json())
        .then((res) => (response = res))
        .catch((err) => err.response);
    return [...response];
};
export const handleRemoveOutCart = async (itemID, token) => {
    return await axios
        .delete(`${url}/user/cart/remove${itemID}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .then((res) => res)
        .catch((err) => err.response);
};

export const handleOrder = async (request, token) => {
    return await axios
        .post(`${url}/booking`, request, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .then((res) => res)
        .catch((err) => err.response);
};

export const onRequestSetStatusOrder = async (status, id, token) => {
    return await axios
        .put(
            `${url}/booking/status/${status}`,
            { id: id },
            {
                headers: {
                    Authorization: "Bearer " + token,
                },
            }
        )
        .then((res) => res)
        .catch((err) => err.response);
};
// export const onRequestComplete = async (request) => {
//     return await axios
//         .post(`${url}/booking/complete`, request, {
//             headers: {
//                 Authorization: "Bearer ",
//             },
//         })
//         .then((res) => res)
//         .catch((err) => err.response);
// };

export const handleGetUserReceipts = async (userID) => {
    return await axios
        .get(`${url}/receipts/${userID}`)
        .then((res) => res)
        .catch((err) => err.response);
};

export const socketLogin = (admin, id) => {
    const payload = {
        admin: admin,
        id: id,
    };
    socket.emit("login", payload);
};
