import React, { useEffect, useState } from "react";
import Product from "../../../lauout/item/Product";
import Category from "../../../lauout/category/Category";
import Filter from "./Filter";
import { BsFillGrid3X3GapFill } from "react-icons/bs";
import { FaList } from "react-icons/fa";
import clsx from "clsx";

// css
import "./index.css";
import aside_banner from "../../../../assets/images/aside_banner.webp";
import Pagination from "./Pagination";
import { handleGetCategory } from "../../../service/APIService";
import filterPriceList from "../../../common/filterPriceList";

const options = ["Mặc định", "A - Z", "Z - A", "Tăng dần", "Giảm dần"];

const optionsSortList = {
    "Mặc định": {
        sort: "",
        type: 0,
    },
    "A - Z": {
        sort: "name",
        type: 1,
    },
    "Z - A": {
        sort: "name",
        type: -1,
    },
    "Tăng dần": {
        sort: "price",
        type: 1,
    },
    "Giảm dần": {
        sort: "price",
        type: -1,
    },
};

const DisplayProducts = () => {
    const [selectSort, setSelectSort] = useState("Mặc định");
    const [changeLayout, setChangeLayout] = useState(0);
    const [list, setList] = useState([]);
    const [filterPrice, setFilterPrice] = useState(null);
    const [paginate, setPaginate] = useState(1);

    const onGetCategory = async (paginate, sort, type) => {
        const max = filterPrice?.max || 0;
        const min = filterPrice?.min || 0;
        const category = handleGetCategory(paginate, sort, type, max, min);
        category
            .then((res) => setList(res.data))
            .catch((err) => console.log(err));
    };

    useEffect(() => {
        const option = optionsSortList[selectSort];
        onGetCategory(paginate, option.sort, option.type);
    }, [paginate, filterPrice]);

    const onSortListDisplay = (value) => {
        const option = optionsSortList[value];
        setSelectSort(value);
        onGetCategory(paginate, option.sort, option.type);
    };

    return (
        <React.Fragment>
            <aside className="collections__left">
                <Category />
                <Filter
                    setFilterPrice={setFilterPrice}
                    setPaginate={setPaginate}
                />
                <img src={aside_banner} alt="" />
            </aside>
            <div className="collections__right flex-1 ml-8 none__copy">
                <div className=" flex justify-between items-center mx-2 mb-4 border-1 rounded-md p-2">
                    <div className="flex gap-4 text-lg">
                        {[BsFillGrid3X3GapFill, FaList].map((Icon, index) => (
                            <Icon
                                key={index}
                                className={clsx("cursor-pointer", {
                                    "icon__changeLayout-choose":
                                        changeLayout === index,
                                })}
                                onClick={() => setChangeLayout(index)}
                            />
                        ))}
                    </div>
                    <div className="text-sm">
                        <label>Sắp xếp: </label>
                        <select
                            className="pl-4 pr-12 py-1 border-1"
                            value={selectSort}
                            onChange={(e) => onSortListDisplay(e.target.value)}
                        >
                            {options.map((item, i) => (
                                <option value={item} key={i}>
                                    {item}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <div
                    className={clsx("grid grid-cols-3 gap-4", {
                        layout__line: changeLayout === 1,
                    })}
                >
                    {list.map((item) => (
                        <Product
                            item={item}
                            layout={changeLayout}
                            key={item._id}
                        />
                    ))}
                </div>
                <Pagination setPaginate={setPaginate} paginate={paginate} />
            </div>
        </React.Fragment>
    );
};

export default DisplayProducts;
