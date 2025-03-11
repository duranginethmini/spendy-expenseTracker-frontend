import React, { useState } from "react";
import AuthLayout from "../../components/layouts/AuthLayout.jsx";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/inputs/Input.jsx";
import {validateEmail} from "../../utils/helpers.js";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    // Handle login
    const handleLogin = async (e) => {
        e.preventDefault();

        if(!validateEmail(email)) {
            setError("Please enter a valid email!");
            return;
        }
        if(!password) {
            setError("Please enter your password!");
            return;
        }
        setError("");
    };

    return (
        <AuthLayout>
            <div className="lg:[70%] h-3/4 md:h-full flex flex-col justify-center">
                <h3 className="text-xl font-semibold text-black">Welcome Back</h3>
                <p className="text-xs text-slate-700 mt-[5px] mb-6">
                    Please enter your details to log in
                </p>

                <form onSubmit={handleLogin}>
                    <Input
                        value={email}
                        onChange={({ target }) => setEmail(target.value)}
                        label="Email Address"
                        placeholder="durangi@gmail.com"
                        type="text"
                    />
                    <Input
                        value={password}
                        onChange={({ target }) => setPassword(target.value)}
                        label="Password"
                        placeholder="Min 8 characters required"
                        type="password"
                    />
                    {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}
                    <button type="submit" className="btn btn-primary">
                        Login
                    </button>
                    <p className="text-[13px] text-slate-800 mt-3">
                        Don't have an account?{" "}
                        <Link className="font-medium text-primary underline" to="/signup">
                            Signup
                        </Link>
                    </p>
                </form>
            </div>
        </AuthLayout>
    );
};

export default Login;
