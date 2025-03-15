import React from 'react';
import Input from "../inputs/Input.jsx";
import EmojiPicker from "emoji-picker-react";
import EmojiPickerPopup from "../EmojiPickerPopup.jsx";

const  AddIncomeForm = ({onAddIncome}) => {
    const [income, setIncome] = React.useState({
        source : "",
        amount : "",
        date : "",
        icon : ""
    });

    const handleChange = (key,value) => setIncome({...income, [key]: value});
    return (
        <div className="">
            <EmojiPickerPopup
                icon={income.icon}
                onSelect = {(selectedIcon) => handleChange("income", selectedIcon)}
                />
            <Input
                value={income.source}
                onChange={({ target}) => handleChange("source", target.value)}
                label="Income Source"
                placeholder="Freelance,Salary,etc"
                type="text"
                />
            <Input
            value={income.amount}
            onChange={({ target }) => handleChange("amount", target.value)}
            label="Amount"
            placeholder=""
            type="number"
            />
            <Input
            value={income.date}
            onChange={({ target }) => handleChange("date", target.value)}
            label="Date"
            placeholder=""
            type="date"
            />
            <div className="flex justify-end mt-6 ">
                <button
                    type="button"
                    className="add-btn add-btn-fill"
                    onClick={() => onAddIncome(income)}
                    >
                    Add Income
                </button>
            </div>
        </div>
    )
}
export default AddIncomeForm;