import React, {useEffect, useState} from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout.jsx";
import {UseUserAuth} from "../../hooks/UseUserAuth.jsx";
import {useNavigate} from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance.js";
import {API_PATHS} from "../../utils/apiPath.js";
import {IoMdCard} from "react-icons/io";
import InfoCard from "../../components/Cards/InfoCard.jsx";
import {LuHandCoins,LuWalletMinimal} from "react-icons/lu";
import {addThousandsSeparator} from "../../utils/helpers.js";

const Home = () => {
    UseUserAuth();
    const navigate = useNavigate();

    const [dashboardData, setDashboardData] = useState(null);
    const [loading, setLoading] = useState(false);

    const fetchDashboardData = async () => {
        if(loading) return;

        setLoading(true);

        try{
            const response = await axiosInstance.get(
                    `${API_PATHS.DASHBOARD.GET_DATA}`
            );
            if(response.data) {
                setDashboardData(response.data);
            }
        } catch (error) {
            console.error("Failed to fetch data:", error);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchDashboardData();
        return () => {}
    },[])
    return (
        <DashboardLayout activeMenu="Dashboard">
           <div className = "my-5 mx-auto">
               <div className="grid grid-cols md:grid-cols-3 gap-6">
                   <InfoCard
                       icon = {<IoMdCard/>}
                       label = "Total Balance"
                       value = {addThousandsSeparator(dashboardData?.totalBalance || 0 )}
                       color = "bg-primary"
                       />
                   <InfoCard
                       icon = {<IoMdCard/>}
                       label = "Total Income"
                       value = {addThousandsSeparator(dashboardData?.totalBalance || 0 )}
                       color = "bg-orange-500"
                   />
                   <InfoCard
                       icon = {<IoMdCard/>}
                       label = "Total Expense"
                       value = {addThousandsSeparator(dashboardData?.totalBalance || 0 )}
                       color = "bg-red-500"
                   />
               </div>
           </div>
        </DashboardLayout>
    );
};

export default Home;
