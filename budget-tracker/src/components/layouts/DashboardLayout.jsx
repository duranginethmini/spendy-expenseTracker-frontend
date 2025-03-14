import React, { useContext } from "react";
import Navbar from "./Navbar.jsx";
import { UserContext } from "../../context/UserContext.jsx";
import Sidemenu from "./Sidemenu.jsx";

const DashboardLayout = ({ children, activeMenu }) => {
    const { user } = useContext(UserContext);

    console.log("User context:", user); // Debugging

    return (
        <div>
            <Navbar activeMenu={activeMenu} />

            {user && (
                <div className="flex">
                    <div className="hidden md:block">
                        <Sidemenu activeMenu={activeMenu} />
                    </div>
                    <div className="grow mx-5">{children}</div>
                </div>
            )}
        </div>
    );
};

export default DashboardLayout;
