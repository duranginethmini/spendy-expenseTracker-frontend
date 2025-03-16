import React, {useEffect} from 'react';
import DashboardLayout from "../../components/layouts/DashboardLayout.jsx";
import IncomeOverview from "../../components/Income/IncomeOverview.jsx";
import axiosInstance from "../../utils/axiosInstance.js";
import {API_PATHS} from "../../utils/apiPath.js";
import Modal from "../../components/Modal.jsx";
import AddIncomeForm from "../../components/Income/AddIncomeForm.jsx";
import toast from "react-hot-toast";

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
    const handleAddIncome = async (income) => {
        const { source, amount, date, icon } = income;

        //validation checks
        if(!source.trim()) {
            toast.error("Source can't be empty!");
            return;
        }
        if (!amount || isNaN(amount) || Number(amount) <= 0 ) {
            toast.error("Amount must be greater than 0!");
            return;
        }
        if(!date) {
            toast.error("Date is required!");
            return;
        }
        try {
            await axiosInstance.post(API_PATHS.INCOME.ADD_INCOME, {
                source,
                amount,
                date,
                icon
            });
            setOpenAddIncomeModal(false);
            toast.success("Income added successfully!");
            fetchIncomeDetails()
        } catch (error) {
            console.error("error adding income detail:", error.response?.data?.message || error.message);
        }
    };

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
                     <Modal
                         isOpen={openAddIncomeModal}
                         onClose={() => setOpenAddIncomeModal(false)}
                         title="Add Income"
                         >
                         <AddIncomeForm onAddIncome={handleAddIncome} />
                     </Modal>
                 </div>
        </DashboardLayout>
    )
}

export default Income;