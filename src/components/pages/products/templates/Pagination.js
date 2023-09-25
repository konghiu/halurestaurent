import React from "react";
import { backToTop } from "../../../service/backToTop";

const Pagination = ({ setPaginate, paginate }) => {
    return (
        <div className="pagination mt-6 none__copy">
            <span>&laquo;</span>
            {[1, 2, 3].map((i) => (
                <span
                    key={i}
                    className={i === paginate ? "active" : ""}
                    onClick={() => setPaginate(i)}
                >
                    {i}
                </span>
            ))}
            <span>&raquo;</span>
        </div>
    );
};

export default Pagination;
