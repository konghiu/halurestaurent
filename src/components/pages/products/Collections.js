import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";

// css
import "./collections.css";
import { useSelector } from "react-redux";

const Collections = () => {
    const product = useSelector((state) => state.productSlide);

    useEffect(() => {}, []);

    return (
        <section className="center collections py-8">
            <div className="container flex">
                <Outlet context={product} />
            </div>
        </section>
    );
};

export default Collections;
