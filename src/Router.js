import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";

import Home from "./components/pages/home/Home";
import Introduction from "./components/pages/introduction/Introduction";
import Contact from "./components/pages/contact/Contact";
import News from "./components/pages/news/News";
import Collections from "./components/pages/products/Collections";
import Account from "./components/pages/account/Account";
import SignIn from "./components/pages/sign/SignIn";
import SignOn from "./components/pages/sign/SignOn";
import Cart from "./components/pages/cart/Cart";
import Detail from "./components/pages/products/templates/Detail";
import DisplayProducts from "./components/pages/products/templates/DisplayProducts";
import { backToTop } from "./components/service/backToTop";
import Search from "./components/pages/products/templates/Search";
import Payment from "./components/pages/payment/Payment";
import Sign from "./components/pages/sign/Sign";
import DeliveryAddress from "./components/pages/account/templates/DeliveryAddress";
import ChangePassword from "./components/pages/account/templates/ChangePassword";
import Transaction from "./components/pages/account/templates/Transaction";
import Profile from "./components/pages/account/templates/Profile";
import SignOut from "./components/pages/sign/SignOut";
import OrderPage from "./components/pages/admin/templates/Booking";
import Admin from "./components/pages/admin/Admin";
import Booking from "./components/pages/admin/templates/Booking";
import Main from "./components/pages/admin/templates/Main";
import { useSelector } from "react-redux";
import NotFound from "./components/pages/not-found/NotFound";

const Router = () => {
    const location = useLocation();
    const user = useSelector((state) => state.userSlice);

    React.useEffect(() => {
        backToTop();
    }, [location.pathname]);

    return (
        <Routes>
            <Route path="/halurestaurent" element={<Home />} />
            <Route path="/halurestaurent/home" element={<Home />} />
            <Route path="/halurestaurent/aboutUs" element={<Introduction />} />
            <Route path="/halurestaurent/booking" element={<OrderPage />} />
            <Route path="/halurestaurent/collections" element={<Collections />}>
                <Route path="detail/:slug" element={<Detail />} />
                <Route path="search/:name" element={<Search />} />
                <Route path="all" element={<DisplayProducts />} />
            </Route>
            <Route path="/halurestaurent/news" element={<News />}></Route>
            <Route path="/halurestaurent/contact" element={<Contact />}></Route>
            <Route path="/halurestaurent/sign" element={<Sign />}>
                <Route path="" element={<SignIn />} />
                <Route path="sign-in" element={<SignIn />} />
                <Route path="sign-on" element={<SignOn />} />
                <Route path="sign-out" element={<SignOut />} />
            </Route>
            <Route path="/halurestaurent/account" element={<Account />}>
                <Route path="" element={<Profile />}></Route>
                <Route path="profile" element={<Profile />}></Route>
                <Route
                    path="change-password"
                    element={<ChangePassword />}
                ></Route>
                <Route path="orders" element={<Transaction />}></Route>
                <Route path="addresses" element={<DeliveryAddress />}></Route>
            </Route>
            <Route path="/halurestaurent/cart" element={<Cart />}></Route>
            <Route path="/halurestaurent/payment" element={<Payment />}></Route>
            {user?.admin && (
                <Route path="/halurestaurent/admin" element={<Admin />}>
                    <Route path="" element={<Main />}></Route>
                    <Route path="booking" element={<Booking />}></Route>
                </Route>
            )}
            <Route path="*" element={<NotFound />}></Route>
        </Routes>
    );
};

export default Router;
