import React from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Cell,
} from "recharts";
import CustomTooltip from "./CustomTooltip.jsx";

const CustomBarChart = ({ data = [] }) => {
    if (!data || data.length === 0) {
        return <p className="text-gray-500 text-center mt-4">No data available</p>;
    }

    const getBarColor = (index) => (index % 2 === 0 ? "#875cf5" : "#cfbefb");

    return (
        <div className="bg-white mt-6">
            <ResponsiveContainer width="100%" height={380}>
                <BarChart data={data}>
                    <CartesianGrid stroke="none" />
                    <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#555" }} stroke="none" />
                    <YAxis tick={{ fontSize: 12, fill: "#555" }} stroke="none" />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="amount" radius={[10, 10, 0, 0]}>
                        {data.map((entry, index) => (
                            <Cell key={index} fill={getBarColor(index)} />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};


export default CustomBarChart;
