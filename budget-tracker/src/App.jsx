import React from "react";
import {
    BrowserRouter,
    Route,
    Routes,
    Navigate,
} from "react-router-dom";
import Login from "./pages/auth/Login.jsx";
import Signup from "./pages/auth/Signup.jsx";
import Home from "./pages/dashboard/Homepage.jsx";
import Income from "./pages/dashboard/Income.jsx";
import Expense from "./pages/dashboard/Expense.jsx";

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Root />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/dashboard" element={<Home />} />
                <Route path="/income" element={<Income />} />
                <Route path="/expense" element={<Expense />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;

const Root = () => {
    // Checking the token
    const isAuthenticated = !!localStorage.getItem("token");

    return isAuthenticated ? (
        <Navigate to="/dashboard" replace />
    ) : (
        <Navigate to="/login" replace />
    );
};
