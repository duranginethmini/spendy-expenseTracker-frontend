import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const Input = ({ placeholder, type, value, onChange, label }) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="flex flex-col gap-1">
            {label && <label className="text-sm font-medium">{label}</label>}
            <div className="relative w-full">
                <input
                    type={type === "password" ? (showPassword ? "text" : "password") : type}
                    placeholder={placeholder}
                    className="w-full bg-transparent outline-none border px-3 py-2 rounded-md"
                    value={value}
                    onChange={onChange}
                />
                {type === "password" && (
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500">
            {showPassword ? (
                <FaRegEye size={22} onClick={() => setShowPassword(false)} />
            ) : (
                <FaRegEyeSlash size={22} onClick={() => setShowPassword(true)} />
            )}
          </span>
                )}
            </div>
        </div>
    );
};

export default Input;
