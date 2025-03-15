import React, {useEffect} from 'react';
import DashboardLayout from "../../components/layouts/DashboardLayout.jsx";
import IncomeOverview from "../../components/Income/IncomeOverview.jsx";
import axiosInstance from "../../utils/axiosInstance.js";
import {API_PATHS} from "../../utils/apiPath.js";

const Income = () => {
    const [incomeData, setIncomeData] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [openDeleteAlert, setOpenDeleteAlert] = React.useState({
        show: false,
        data: null,
    });
    const [openAddIncomeModal, setOpenAddIncomeModal] = React.useState(false);

    //get all income data
    const fetchIncomeDetails = async () => {
        setLoading(true);
        try {
            const response = await axiosInstance.get(`${API_PATHS.INCOME.GET_ALL_INCOME}`);
            console.log("Fetched Income Data:", response.data); // Debug log
            if (response.data) {
                setIncomeData(response.data);
            }
        } catch (error) {
            console.error("Failed to fetch income detail:", error);
        } finally {
            setLoading(false);
        }
    };

    //handle add income
    const handleAddIncome = async (income) => {};

    //Delete Income
    const deleteIncome = async (id) => {}

    //download income detail
    const handleDownloadIncomeDetail = async () => {}

    useEffect(() => {
        fetchIncomeDetails();

        return () => { };
    }, []);
    return (
        <DashboardLayout activeMenu="Income">
                 <div className="my-5 mx-auto">
                     <div className="grid grid-cols-1 gap-6">
                         <div className="">
                             <IncomeOverview
                                 transaction  = {incomeData}
                                 onAddIncome = {() => setOpenAddIncomeModal(true)}
                                 />
                         </div>
                     </div>
                 </div>
        </DashboardLayout>
    )
}

export default Income;