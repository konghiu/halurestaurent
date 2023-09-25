import React, { useRef, useState } from "react";

const InputSign = ({ placeholder, type, label }, ref) => {
    const [text, setText] = useState("");
    const inputRef = useRef(null);

    React.useImperativeHandle(ref, () => {
        return {
            clear() {
                setText("");
            },
            value() {
                return inputRef.current.value;
            },
        };
    });

    return (
        <div className="mb-4">
            <label className="block mb-1 font-bold" htmlFor={label}>
                {label}:
            </label>
            <input
                id={label}
                ref={inputRef}
                placeholder={placeholder}
                className="border-1 pl-4 p-2 block w-full"
                type={type}
                value={text}
                onChange={(e) => setText(e.target.value)}
            />
        </div>
    );
};

export default React.forwardRef(InputSign);
