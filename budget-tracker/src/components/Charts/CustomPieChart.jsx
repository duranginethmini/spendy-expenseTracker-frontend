// import React from "react";
// import {
//     PieChart,
//     Pie,
//     Cell,
//     Tooltip,
//     ResponsiveContainer,
//     Legend,
// } from "recharts";
// import CustomTooltip from "./CustomTooltip.jsx";
// import CustomLegend from "./CustomLegend.jsx";
//
// const CustomPieChart = ({ data = [], label, totalAmount, colors, showTextAnchor }) => {
//     const defaultColors = ["#FF8042", "#0088FE", "#00C49F", "#FFBB28"];
//     const colorArray = colors && colors.length > 0 ? colors : defaultColors;
//
//     return (
//         <ResponsiveContainer width="100%" height={380}>
//             <PieChart>
//                 <Pie
//                     data={data}
//                     dataKey="amount"
//                     nameKey="name"
//                     cx="50%"
//                     cy="50%"
//                     outerRadius={130}
//                     innerRadius={100}
//                     labelLine={false}
//                 >
//                     {data?.length > 0 ? (
//                         data.map((item, index) => (
//                             <Cell key={`cell-${index}`} fill={colorArray[index % colorArray.length]} />
//                         ))
//                     ) : (
//                         <text x="50%" y="50%" textAnchor="middle" fill="gray" fontSize="14px">
//                             No Data Available
//                         </text>
//                     )}
//                 </Pie>
//                 <Tooltip content={<CustomTooltip />} />
//                 <Legend content={<CustomLegend />} />
//                 {showTextAnchor && (
//                     <>
//                         <text
//                             x="50%"
//                             y="50%"
//                             dy="-25"
//                             textAnchor="middle"
//                             fill="#666"
//                             fontSize="14px"
//                         >
//                             {label}
//                         </text>
//                         <text
//                             x="50%"
//                             y="50%"
//                             dy="8"
//                             textAnchor="middle"
//                             fill="#333"
//                             fontSize="24px"
//                             fontWeight="600"
//                         >
//                             {totalAmount}
//                         </text>
//                     </>
//                 )}
//             </PieChart>
//         </ResponsiveContainer>
//     );
// };
//
// export default CustomPieChart;
import React from "react";
import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer,
    Legend,
} from "recharts";
import CustomTooltip from "./CustomTooltip.jsx";

const CustomPieChart = ({ data = [], label, totalAmount, colors, showTextAnchor }) => {
    const defaultColors = ["#FF8042", "#0088FE", "#00C49F"];
    const colorArray = colors && colors.length > 0 ? colors : defaultColors;

    return (
        <ResponsiveContainer width="100%" height={380}>
            <PieChart>
                <Pie
                    data={data}
                    dataKey="amount"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={130}
                    innerRadius={100}
                    labelLine={false}
                >
                    {data.map((item, index) => (
                        <Cell key={`cell-${index}`} fill={colorArray[index % colorArray.length]} />
                    ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend
                    verticalAlign="bottom"
                    align="center"
                    formatter={(value, entry, index) => (
                        <span style={{ color: colorArray[index] }}>{value}</span>
                    )}
                />
                {showTextAnchor && (
                    <>
                        <text
                            x="50%"
                            y="50%"
                            dy="-25"
                            textAnchor="middle"
                            fill="#666"
                            fontSize="14px"
                        >
                            {label}
                        </text>
                        <text
                            x="50%"
                            y="50%"
                            dy="8"
                            textAnchor="middle"
                            fill="#333"
                            fontSize="24px"
                            fontWeight="600"
                        >
                            {totalAmount}
                        </text>
                    </>
                )}
            </PieChart>
        </ResponsiveContainer>
    );
};

export default CustomPieChart;

