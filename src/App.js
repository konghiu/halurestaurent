import React, { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import Header from "./components/lauout/header/Header";
import BackToTop from "./components/lauout/backTop/BackToTop";
import Footer from "./components/lauout/footer/Footer";
import Search from "./components/lauout/header/Search";
import AddItemCart from "./components/lauout/item/AddItemCart";
import ReviewItem from "./components/lauout/item/ReviewItem";
import { useDispatch, useSelector } from "react-redux";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Router from "./Router";
import Loading from "./components/lauout/loading/Loading";
import { useCookies } from "react-cookie";
import {
    handleRefreshToken,
    socketLogin,
} from "./components/service/APIService";
import { login } from "./reducers/userSlice";

const App = () => {
    const dispatch = useDispatch();
    const [cookie] = useCookies();
    const productSlice = useSelector((state) => state.productSlice);
    const searchSlice = useSelector((state) => state.searchSlice);
    const loadingSlice = useSelector((state) => state.loadingSlice);
    const userSlice = useSelector((state) => state.userSlice);
    const [render, setRender] = React.useState(false);

    useEffect(() => {
        const refreshToken = handleRefreshToken(cookie.refreshToken);
        refreshToken
            .then((res) => {
                if (res.status === 200) {
                    dispatch(login(res.data));
                    socketLogin(res.data.admin, res.data._id);
                }
                setRender(true);
            })
            .catch((err) => {
                alert(err.message);
            });
    }, []);

    return (
        <BrowserRouter>
            {render ? (
                <React.Fragment>
                    {loadingSlice.loading && <Loading />}
                    {searchSlice.open && <Search />}
                    {productSlice.cart && (
                        <AddItemCart
                            item={productSlice.cart}
                            user={userSlice}
                        />
                    )}
                    {productSlice.review && (
                        <ReviewItem
                            item={productSlice.review}
                            user={userSlice}
                        />
                    )}
                    <Header />
                    <Router />
                    <BackToTop />
                    <Footer />
                </React.Fragment>
            ) : null}
        </BrowserRouter>
    );
};
// <p>Server not responding</p>

export default App;
