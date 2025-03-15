import React, { useEffect } from 'react';
import { LuPlus } from "react-icons/lu";
import CustomBarChart from "../Charts/CustomBarChart.jsx";
import { prepareIncomeBarChartData } from "../../utils/helpers.js";

const IncomeOverview = ({ transaction, onAddIncome }) => {
    const [chartData, setChartData] = React.useState([]);

    useEffect(() => {
        const result = prepareIncomeBarChartData(transaction);
        console.log("Formatted Chart Data:", result); // 🔍 Debugging log
        setChartData(result);
    }, [transaction]);


    return (
        <div className="card p-4">
            {/* Header Section */}
            <div className="flex items-center justify-between w-full">
                <div>
                    <h5 className="text-lg font-semibold">Income Overview</h5>
                    <p className="text-xs text-gray-400 mt-1">
                        Track your income over time and analyze trends.
                    </p>
                </div>
                {/* Button on the Right */}
                <button className="add-btn" onClick={onAddIncome}>
                    <LuPlus className="text-lg" />
                    Add Income
                </button>
            </div>

            {/* Chart Section */}
            <div className="mt-6">
                <CustomBarChart data={chartData} />
            </div>
        </div>
    );
};

export default IncomeOverview;
