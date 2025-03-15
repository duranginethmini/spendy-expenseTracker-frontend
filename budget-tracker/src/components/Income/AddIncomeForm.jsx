import React from 'react';
import Input from "../inputs/Input.jsx";
import EmojiPickerPopup from "../EmojiPickerPopup.jsx";

const AddIncomeForm = ({ onAddIncome }) => {
    const [income, setIncome] = React.useState({
        source: "",
        amount: "",
        date: "",
        icon: "" // ✅ Make sure this is updated correctly
    });

    const handleChange = (key, value) => {
        setIncome(prevState => ({ ...prevState, [key]: value }));
        console.log(`Updated ${key}:`, value); // Debugging
    };

    return (
        <div>
            <EmojiPickerPopup
                icon={income.icon}
                onSelect={(selectedIcon) => handleChange("icon", selectedIcon)} // ✅ Correct key
            />
            <Input
                value={income.source}
                onChange={({ target }) => handleChange("source", target.value)}
                label="Income Source"
                placeholder="Freelance, Salary, etc."
                type="text"
            />
            <Input
                value={income.amount}
                onChange={({ target }) => handleChange("amount", target.value)}
                label="Amount"
                type="number"
            />
            <Input
                value={income.date}
                onChange={({ target }) => handleChange("date", target.value)}
                label="Date"
                type="date"
            />
            <div className="flex justify-end mt-6">
                <button
                    type="button"
                    className="add-btn add-btn-fill"
                    onClick={() => onAddIncome(income)}
                >
                    Add Income
                </button>
            </div>
        </div>
    );
};

export default AddIncomeForm;
