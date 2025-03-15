import React, { useEffect, useState } from 'react';
import { prepareExpenseBarChartData } from "../../utils/helpers.js";
import CustomBarChart from "../Charts/CustomBarChart.jsx";

const Last30DaysExpenses = ({ data = [] }) => {
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        if (Array.isArray(data)) {
            const result = prepareExpenseBarChartData(data);
            setChartData(result || []);
        } else {
            setChartData([]);
        }
    }, [data]);

    return (
        <div className="card col-span-1">
            <div className="flex items-center justify-between">
                <h5 className="text-lg">Last 30 Days Expenses</h5>
            </div>
            {chartData.length > 0 ? (
                <CustomBarChart data={chartData} />
            ) : (
                <p className="text-center text-gray-500">No data available</p>
            )}
        </div>
    );
};

export default Last30DaysExpenses;
