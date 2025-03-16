import React, {useEffect} from 'react';
import {UseUserAuth} from "../../hooks/UseUserAuth.jsx";
import DashboardLayout from "../../components/layouts/DashboardLayout.jsx";
import axiosInstance from "../../utils/axiosInstance.js";
import {API_PATHS} from "../../utils/apiPath.js";
import toast from "react-hot-toast";
import ExpenseOverview from "../../components/Expense/ExpenseOverview.jsx";
import Modal from "../../components/Modal.jsx";
import AddExpenseForm from "../../components/Expense/AddExpenseForm.jsx";
import ExpenseList from "../../components/Expense/ExpenseList.jsx";
import DeleteAlert from "../../components/DeleteAlert.jsx";

const Expense = () => {
    UseUserAuth();
    const [expenseData, setExpenseData] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [openDeleteAlert, setOpenDeleteAlert] = React.useState({
        show: false,
        data: null,
    });
    const [openAddExpenseModal, setOpenAddExpenseModal] = React.useState(false);

    //get all expense data
    const fetchExpenseDetails = async () => {
        setLoading(true);
        try {
            const response = await axiosInstance.get(`${API_PATHS.EXPENSE. GET_ALL_EXPENSE}`);
            console.log("Fetched Expense Data:", response.data);
            if (response.data) {
                setExpenseData(response.data);
            }
        } catch (error) {
            console.error("Failed to fetch expense detail:", error);
        } finally {
            setLoading(false);
        }
    };
    // add expense
    const handleAddExpense = async (expense) => {
        const { category, amount, date, icon } = expense;

        //validation checks
        if(!category.trim()) {
            toast.error("Category can't be empty!");
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
            await axiosInstance.post(API_PATHS.EXPENSE.ADD_EXPENSE, {
                category,
                amount,
                date,
                icon
            });
            setOpenAddExpenseModal(false);
            toast.success("Expense added successfully!");
            fetchExpenseDetails()
        } catch (error) {
            console.error("error adding expense detail:", error.response?.data?.message || error.message);
        }
    };
    //Delete expense
    const deleteExpense = async (id) => {
        if (!id) {
            console.error("Invalid expense ID:", id);
            return;
        }

        try {
            const deleteURL = API_PATHS.EXPENSE.DELETE_EXPENSE(id); // Ensure this is a function
            console.log("Deleting Expense from:", deleteURL);

            await axiosInstance.delete(deleteURL);
            setOpenDeleteAlert({ show: false, data: null });
            toast.success("Expense deleted successfully!");
            fetchExpenseDetails();
        } catch (error) {
            console.error("Error deleting expense detail:", error.response?.data?.message || error.message);
        }
    };


    //download expense detail
    const handleDownloadExpenseDetail = async () => {}


    useEffect(() => {
        fetchExpenseDetails();
        return () => {};
    }, []);

    return (
        <DashboardLayout activeMenu="Expense">
            <div className="my-5 mx-auto">
                <div className="grid grid-cols-1 gap-6">
                    <div className="">
                        <ExpenseOverview
                            transactions={expenseData}
                            onExpenseIncome={() => setOpenAddExpenseModal(true)}
                            />
                    </div>
                    <ExpenseList
                        transactions={expenseData}
                        onDelete={(id) => {
                            setOpenDeleteAlert({show: true, data: id});
                        }}
                        onDownload={handleDownloadExpenseDetail}
                        />
                </div>
                <Modal
                    isOpen={openAddExpenseModal}
                    onClose={() => setOpenAddExpenseModal(false)}
                    title="Add Expense"
                    >
                    <AddExpenseForm onAddExpense={handleAddExpense} />
                </Modal>
                <Modal
                    isOpen={openDeleteAlert.show}
                    onClose={() => setOpenDeleteAlert({show:false,data:null })}
                    title="Delete Expense"
                >
                    <DeleteAlert
                        content="Are you sure you want to delete this Expense?"
                        onDelete = {() => deleteExpense(openDeleteAlert.data)}
                    />
                </Modal>
            </div>
            </DashboardLayout>
    )
}

export default Expense;