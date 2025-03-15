import moment from "moment";

export const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
};

export const getInitials = (name) => {
    if (!name) return;

    const words = name.split(' ');
    let initials = "";

    for (let i = 0; i < Math.min(words.length); i++) {
        initials += words[i][0];
    }
    return initials.toUpperCase();
};

export const addThousandsSeparator = (num) => {
    if(num == null || isNaN(num)) return "";

    const [integerPart, fractionalPart] = num.toString().split(".");
    const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    return fractionalPart
    ? `${formattedInteger}${fractionalPart}`
        : formattedInteger;
}

export const prepareExpenseBarChartData = (data = []) => {
    const chartData = data.map((item) => ({
        category: item?.category,
        amount: item?.amount,
    }));
    return chartData;
};

// export const prepareIncomeBarChartData = (data = []) => {
//     const sortedData = [...data].sort((a,b) => new Date(a.date) - new Date(b.date));
//
//     const ChartData = sortedData.map((item) => ({
//         month:moment(item?.date).format("YYYY-MM-DD"),
//         amount: item?.amount,
//         source: item?.source,
//     }));
//     return ChartData;
// }
export const prepareIncomeBarChartData = (data = []) => {
    if (!Array.isArray(data) || data.length === 0) return [];

    return data
        .filter((item) => item.date && item.amount) // Ensure valid data
        .sort((a, b) => new Date(a.date) - new Date(b.date)) // Sort by date
        .map((item) => ({
            month: moment(item.date).format("MMM YYYY"), // Example: "Mar 2025"
            amount: item.amount || 0,
            source: item.source || "Unknown",
        }));
};
