import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./notFound.css";
import { useState } from "react";

const NotFound = () => {
    const navigate = useNavigate();
    const [search, setSearch] = useState("");

    const handleSearch = () => {
        navigate(`/halurestaurent/collections/search/${search}`);
    };

    return (
        <section className="center">
            <div className="notFound container center py-8">
                <div className=" flex flex-col items-center py-12">
                    <h1 className="text-8xl font-bold">404</h1>
                    <h3 className="mt-4 text-sm">
                        OOPS! THE PAGE YOU ARE LOOKING FOR CAN'T BE FOUND
                    </h3>
                    <div className="notFound__search">
                        <input
                            type="text"
                            placeholder="Search ..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") handleSearch();
                            }}
                        />
                        <button onClick={handleSearch}>Search</button>
                    </div>
                    <Link
                        to="/halurestaurent/home"
                        className="text-xs text-blue-400 hover:text-blue-600 hover:underline"
                    >
                        BACK TO HOME
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default NotFound;
