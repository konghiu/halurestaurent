import React, { useState } from "react";
import filterPriceList from "../../../common/filterPriceList";

// image

const Filter = (props) => {
    const [filterPrice, setFilterPrice] = useState(null);

    const handleFilterPrice = (filter) => {
        setFilterPrice(filter.id);
        props.setFilterPrice(filter);
        props.setPaginate(1);
    };

    return (
        <div className="my-8 none__copy">
            <h1 className="main__bg font-bold rounded-t-md text-white py-2 px-3">
                BỘ LỌC
            </h1>
            <div className="border-1 border-t-0 rounded-b-md py-2">
                <h2 className="font-bold px-3 mb-3">Giá sản phẩm</h2>
                <ul>
                    {filterPriceList.map((filter, index) => (
                        <li key={filter.id} className="pb-2 px-3 text-sm">
                            <input
                                type="checkbox"
                                className="cursor-pointer"
                                checked={filterPrice?.id === filter.id}
                                onChange={() => handleFilterPrice(filter)}
                            />
                            <label
                                onClick={() => handleFilterPrice(filter)}
                                className="text-gray-400 ml-2 cursor-pointer hover:main__color"
                            >
                                {filter.title}
                            </label>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Filter;
