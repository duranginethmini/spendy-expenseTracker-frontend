
import React from 'react';
import { LuDownload } from "react-icons/lu";
import TransactionInfoCard from "../Cards/TransactionInfoCard.jsx";
import moment from "moment";

const IncomeList = ({ transaction, onDelete, onDownload }) => {
    return (
        <div className="card">
            <div className="flex items-center justify-between">
                <h5 className="text-lg">Income Sources</h5>
                <button className="card-btn" onClick={onDownload}>
                    <LuDownload className="text-base" /> Download
                </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2">
                {transaction?.map((income) => (
                    <TransactionInfoCard
                        key={income._id} // Use `_id` if needed
                        title={income.source}
                        income={income.icon}
                        date={moment(income.date).format('YYYY-MM-DD')}
                        amount={income.amount}
                        type="income"
                        onDelete={() => {
                            console.log("Deleting income with ID:", income._id || income.id); // Debugging
                            onDelete(income._id || income.id);
                        }}
                    />
                ))}
            </div>
        </div>
    );
};

export default IncomeList;
