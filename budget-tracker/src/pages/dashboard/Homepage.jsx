import React, {useEffect, useState} from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout.jsx";
import {UseUserAuth} from "../../hooks/UseUserAuth.jsx";
import {useNavigate} from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance.js";
import {API_PATHS} from "../../utils/apiPath.js";

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
            <div className="my-5 mx-auto w-full text-center text-gray-600">
                Welcome to your Expense Tracker Dashboard!
            </div>
        </DashboardLayout>
    );
};

export default Home;
