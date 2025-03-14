import React from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout.jsx";
import {UseUserAuth} from "../../hooks/UseUserAuth.jsx";

const Home = () => {
    UseUserAuth();
    return (
        <DashboardLayout activeMenu="Dashboard">
            <div className="my-5 mx-auto w-full text-center text-gray-600">
                Welcome to your Expense Tracker Dashboard!
            </div>
        </DashboardLayout>
    );
};

export default Home;
