import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import InputSign from "../../../forms/InputSign";
import { AiOutlineCloseSquare } from "react-icons/ai";
import { loadingProccess } from "../../../../reducers/loadingSlice";
import slugify from "slugify";
import { Link } from "react-router-dom";

const InsertProduct = () => {
    const dispatch = useDispatch();

    const nameRef = useRef();
    const classifyRef = useRef();
    const saleRef = useRef();
    const priceRef = useRef();
    const quantityRef = useRef();
    const [description, setDescription] = useState("");
    const [image, setImage] = useState(null);

    const handleInsertProduct = async () => {};

    const handleAddImage = (target) => {
        let file = target.files[0];
        setImage({
            render: URL.createObjectURL(file),
            api: file,
        });
    };

    return (
        <div>
            <h1 className="main__color font-bold text-2xl mb-4">
                Thêm sản phẩm vào kho hàng
            </h1>
            <form className="font-sm w-1/2 inline-block">
                <InputSign
                    placeholder="Tên sản phẩm"
                    type="text"
                    label="Tên sản phẩm"
                    ref={nameRef}
                />
                <InputSign
                    placeholder="Loại sản phẩm"
                    type="text"
                    label="Loại sản phẩm"
                    ref={classifyRef}
                />
                <InputSign
                    ref={quantityRef}
                    placeholder="1"
                    type="number"
                    label="Số lượng"
                />
                <InputSign
                    placeholder="Sale (%)"
                    type="number"
                    label="Sale"
                    ref={saleRef}
                />
                <InputSign
                    placeholder="Giá tiền (đ)"
                    type="number"
                    label="Giá cả"
                    ref={priceRef}
                />

                <div className="mb-4">
                    <label className="block mb-1 font-bold">
                        Mô tả sản phẩm
                    </label>
                    <textarea
                        placeholder="Mô tả sản phẩm"
                        className="border-1 pl-4 p-2 block w-full h-40"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    ></textarea>
                </div>
            </form>
            <div className="w-1/2 flex flex-col  pl-20 float-right mt-7">
                <div className="border-1 h-96 w-96 flex items-center justify-center relative">
                    {image && (
                        <React.Fragment>
                            <AiOutlineCloseSquare className="absolute top-0 right-0 text-2xl" />
                            <img
                                onClick={() => setImage(null)}
                                src={image.render}
                                alt=""
                                className="w-full h-full absolute"
                            />
                        </React.Fragment>
                    )}
                    <input
                        type="file"
                        accept="image/*"
                        id="choseImg"
                        className="hidden"
                        onChange={(e) => handleAddImage(e.target)}
                    />
                    <label
                        htmlFor="choseImg"
                        className="hover:main__color cursor-pointer"
                    >
                        Chọn hình ảnh *
                    </label>
                </div>
                <button
                    onClick={handleInsertProduct}
                    className="main__bg py-2 px-4 mt-8 text-white rounded-sm w-fit hover:opacity-75"
                >
                    Thêm vào kho hàng
                </button>
                <Link
                    to="/account/list"
                    className="main__bg py-2 px-4 mt-8 text-white rounded-sm w-fit hover:opacity-75"
                >
                    Xem danh sách
                </Link>
            </div>
        </div>
    );
};

export default InsertProduct;
