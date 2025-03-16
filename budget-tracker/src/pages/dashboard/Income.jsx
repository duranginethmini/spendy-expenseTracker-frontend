import React, {useEffect} from 'react';
import DashboardLayout from "../../components/layouts/DashboardLayout.jsx";
import IncomeOverview from "../../components/Income/IncomeOverview.jsx";
import axiosInstance from "../../utils/axiosInstance.js";
import {API_PATHS} from "../../utils/apiPath.js";
import Modal from "../../components/Modal.jsx";
import AddIncomeForm from "../../components/Income/AddIncomeForm.jsx";
import toast from "react-hot-toast";
import IncomeList from "../../components/Income/IncomeList.jsx";
import DeleteAlert from "../../components/DeleteAlert.jsx";
import {UseUserAuth} from "../../hooks/UseUserAuth.jsx";

const Income = () => {
    UseUserAuth();
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
    const deleteIncome = async (id) => {
        try {
            const deleteURL = API_PATHS.INCOME.DELETE_INCOME(id);
            console.log("Deleting Income from:", deleteURL); // Debugging

            await axiosInstance.delete(deleteURL);
            setOpenDeleteAlert({ show: false, data: null });
            toast.success("Income deleted successfully!");
            fetchIncomeDetails();
        } catch (error) {
            console.error("Error deleting income detail:", error.response?.data?.message || error.message);
        }
    };


    //download income detail
    const handleDownloadIncomeDetail = async () => {
        try {
            const response = await axiosInstance.get(API_PATHS.INCOME.DOWNLOAD_INCOME,
                {
                    responseType: "blob",
                });

            //create a URL for the blob
            const url =window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download","income_details.xlsx");
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);
            window.URL.revokeObjectURL(url);
        }catch (error) {
            console.error("Error downloading income detail:", error);
            toast.error("Error downloading income detail:", error);
        }
    }

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
                         <IncomeList
                             transaction  = {incomeData}
                             onDelete={(id) => {
                                 setOpenDeleteAlert({show:true, data:id});
                             }}
                             onDownload = {handleDownloadIncomeDetail}
                             />
                     </div>
                     <Modal
                         isOpen={openAddIncomeModal}
                         onClose={() => setOpenAddIncomeModal(false)}
                         title="Add Income"
                         >
                         <AddIncomeForm onAddIncome={handleAddIncome} />
                     </Modal>
                     <Modal
                     isOpen={openDeleteAlert.show}
                     onClose={() => setOpenDeleteAlert({show:false,data:null })}
                     title="Delete Income"
                     >
                         <DeleteAlert
                             content="Are you sure you want to delete this Income?"
                             onDelete = {() => deleteIncome(openDeleteAlert.data)}
                             />
                     </Modal>
                 </div>
        </DashboardLayout>
    )
}

export default Income;