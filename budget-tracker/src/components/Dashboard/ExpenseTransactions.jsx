// // import React from 'react';
// // import {LuArrowRight} from "react-icons/lu";
// // import TransactionInfoCard from "../Cards/TransactionInfoCard.jsx";
// // import moment from "moment";
// //
// // const ExpenseTransactions = ({ transactions,onSeeMore}) => {
// //     return (
// //         <div className="card">
// //             <div className="flex items-center justify-between">
// //                 <h5 className="text-lg">Expenses</h5>
// //                 <button className="card-btn" onClick={onSeeMore}>
// //                     See All <LuArrowRight className="text-base"/>
// //                 </button>
// //             </div>
// //             <div className="mt-6">
// //                 {transactions?.slice(0, 5).map((expense) => (
// //                     <TransactionInfoCard
// //                     key={expense.id}
// //                     title={expense.category}
// //                     icon={expense.icon}
// //                     date={moment(expense.date).format('YYYY-MM-DD')}
// //                     amount={expense.amount}
// //                     type="expense"
// //                     hideDeleteBtn/>
// //                 ))}
// //             </div>
// //         </div>
// //     )
// // }
// // export default ExpenseTransactions;
// import React from 'react';
// import { LuArrowRight } from "react-icons/lu";
// import TransactionInfoCard from "../Cards/TransactionInfoCard.jsx";
// import moment from "moment";
//
// const ExpenseTransactions = ({ transactions = [], onSeeMore }) => {
//     return (
//         <div className="card">
//             <div className="flex items-center justify-between">
//                 <h5 className="text-lg">Expenses</h5>
//                 <button className="card-btn" onClick={onSeeMore}>
//                     See All <LuArrowRight className="text-base"/>
//                 </button>
//             </div>
//             <div className="mt-6">
//                 {transactions.length > 0 ? (
//                     transactions.slice(0, 5).map((expense) => (
//                         <TransactionInfoCard
//                             key={expense.id}
//                             title={expense.category}
//                             icon={expense.icon}
//                             date={moment(expense.date).format('YYYY-MM-DD')}
//                             amount={expense.amount}
//                             type="expense"
//                             hideDeleteBtn
//                         />
//                     ))
//                 ) : (
//                     <p className="text-gray-500 text-center">No transactions available</p>
//                 )}
//             </div>
//         </div>
//     );
// };
//
// export default ExpenseTransactions;
import React from 'react';
import { LuArrowRight } from "react-icons/lu";
import TransactionInfoCard from "../Cards/TransactionInfoCard.jsx";
import moment from "moment";

const ExpenseTransactions = ({ transactions = [], onSeeMore }) => {
    return (
        <div className="card">
            <div className="flex items-center justify-between">
                <h5 className="text-lg">Expenses</h5>
                <button className="card-btn" onClick={onSeeMore}>
                    See All <LuArrowRight className="text-base" />
                </button>
            </div>
            <div className="mt-6">
                {transactions.length > 0 ? (
                    transactions.slice(0, 5).map((expense, index) => (
                        <TransactionInfoCard
                            key={expense.id || index} // Fallback to index if id is not available or unique
                            title={expense.category}
                            icon={expense.icon}
                            date={moment(expense.date).format('YYYY-MM-DD')}
                            amount={expense.amount}
                            type="expense"
                            hideDeleteBtn
                        />
                    ))
                ) : (
                    <p className="text-gray-500 text-center">No transactions available</p>
                )}
            </div>
        </div>
    );
};

export default ExpenseTransactions;

