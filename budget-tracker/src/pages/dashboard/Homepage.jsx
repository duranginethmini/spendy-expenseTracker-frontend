import React, { useEffect, useState, useCallback } from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout.jsx";
import { UseUserAuth } from "../../hooks/UseUserAuth.jsx";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance.js";
import { API_PATHS } from "../../utils/apiPath.js";
import { IoMdCard } from "react-icons/io";
import InfoCard from "../../components/Cards/InfoCard.jsx";
import { LuHandCoins, LuWalletMinimal } from "react-icons/lu";
import { addThousandsSeparator } from "../../utils/helpers.js";
import RecentTransactions from "../../components/Dashboard/RecentTransactions.jsx";
import FinanceOverview from "../../components/Dashboard/FinanceOverview.jsx";
import ExpenseTransactions from "../../components/Dashboard/ExpenseTransactions.jsx";
import Last30DaysExpenses from "../../components/Dashboard/Last30DaysExpenses.jsx";
import RecentIncomeWithChart from "../../components/Dashboard/RecentIncomeWithChart.jsx";
import RecentIncome from "../../components/Dashboard/RecentIncome.jsx";

const Home = () => {
    UseUserAuth();
    const navigate = useNavigate();

    const [dashboardData, setDashboardData] = useState({});
    const [loading, setLoading] = useState(false);

    const fetchDashboardData = useCallback(async () => {
        if (loading) return;

        setLoading(true);

        try {
            const response = await axiosInstance.get(API_PATHS.DASHBOARD.GET_DATA);
            if (response.data) {
                setDashboardData(response.data);
            }
        } catch (error) {
            console.error("Failed to fetch data:", error);
        } finally {
            setLoading(false);
        }
    }, [loading]);

    useEffect(() => {
        fetchDashboardData();
    }, [fetchDashboardData]);

    return (
        <DashboardLayout activeMenu="Dashboard">
            <div className="my-5 mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <InfoCard
                        icon={<IoMdCard />}
                        label="Total Balance"
                        value={addThousandsSeparator(dashboardData?.totalBalance || 0)}
                        color="bg-primary"
                    />
                    <InfoCard
                        icon={<LuWalletMinimal />}
                        label="Total Income"
                        value={addThousandsSeparator(dashboardData?.totalIncome || 0)}
                        color="bg-orange-500"
                    />
                    <InfoCard
                        icon={<LuHandCoins />}
                        label="Total Expense"
                        value={addThousandsSeparator(dashboardData?.totalExpense || 0)}
                        color="bg-red-500"
                    />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    <RecentTransactions
                        transactions={dashboardData?.recentTransactions || []}
                        onSeeMore={() => navigate("/expense")}
                    />
                    <FinanceOverview
                        totalBalance={dashboardData?.totalBalance || 0}
                        totalIncome={dashboardData?.totalIncome || 0}
                        totalExpense={dashboardData?.totalExpense || 0}
                    />
                    <ExpenseTransactions
                        transactions={dashboardData?.last30DaysExpense?.transactions || []}
                        onSeeMore={() => navigate("/expense")}
                    />
                    <Last30DaysExpenses
                        data={dashboardData?.last30DaysExpense?.transactions || []}
                    />
                    <RecentIncomeWithChart
                        data={dashboardData?.last60DaysIncome?.transactions?.slice(0, 4) || []}
                        totalIncome={dashboardData?.totalIncome || 0}
                    />
                    <RecentIncome
                        transactions={dashboardData?.last60DaysIncome?.transactions || []}
                        onSeeMore={() => navigate("/income")}
                    />
                </div>
            </div>
        </DashboardLayout>
    );
};

export default Home;
