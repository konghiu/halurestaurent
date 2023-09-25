import React, { useState } from "react";
import { MdClose } from "react-icons/md";
import { useDispatch } from "react-redux";
import { close } from "../../../reducers/searchSlice";
import { useNavigate } from "react-router-dom";

const Search = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [searchText, setSearchText] = useState("");

    const handleAccessSearch = () => {
        dispatch(close());
        navigate(`/halurestaurent/collections/search/${searchText}`);
    };

    return (
        <div className="center bg-black z-20 h-full w-full items-center bg-opacity-80 fixed top-0 left-0">
            <MdClose
                className="absolute right-10 top-10 text-3xl cursor-pointer text-white"
                onClick={() => dispatch(close())}
            />
            <div className="container text-white flex flex-col items-center none__copy">
                <input
                    type="text"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    placeholder="Nhập từ khóa bạn muốn tìm kiếm"
                    onKeyDown={(e) => {
                        if (e.key === "Enter") handleAccessSearch();
                    }}
                    className=" w-full bg-transparent py-2 text-xl font-bold text-center border-b-1"
                />
                <button
                    onClick={handleAccessSearch}
                    className="mt-4 text-xl hover:text-white hover:main__bg px-8 py-2 rounded-md"
                >
                    Tìm kiếm
                </button>
            </div>
        </div>
    );
};

export default Search;
