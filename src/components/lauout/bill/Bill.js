import React from "react";
import "./bill.css";
import { convertCost, convertDate } from "../../service/features";

const Bill = ({ bill }) => {
    return (
        <div key={bill._id} className={`bill`}>
            <h2>
                RECEIPT <small style={{ fontSize: "12px" }}>#{bill._id}</small>
            </h2>
            <div>
                <h5>RECEIPT DATE</h5>
                <p>{convertDate(bill.createdAt).date}</p>
            </div>
            <div>
                <h5>RECEIPT TIME</h5>
                <p>{convertDate(bill.createdAt).time}</p>
            </div>
            <div className="bill__fromto">
                <div>
                    <h5>FROM</h5>
                    <p>John Smith,</p>
                    <p>Go Vap, Tp. Ho Chi Minh</p>
                </div>
                <div>
                    <h5>TO</h5>
                    <p>{bill.recipient},</p>
                    <p>{bill.address}</p>
                </div>
            </div>
            <table className="bill__products">
                <thead>
                    <tr>
                        <th>NAME</th>
                        <th>PRICE</th>
                        <th>QTY</th>
                        <th>CPL</th>
                    </tr>
                </thead>
                <tbody>
                    {bill.category.map((item) => (
                        <tr key={item._id}>
                            <th>{item.name}</th>
                            <th>{convertCost(item.price)}</th>
                            <th>{item.quantity}</th>
                            <th>{convertCost(item.quantity * item.price)}</th>
                        </tr>
                    ))}
                </tbody>
            </table>
            <p className="bill__total">
                <b>total price: </b>
                {convertCost(bill.total)}
            </p>
        </div>
    );
};

export default Bill;
