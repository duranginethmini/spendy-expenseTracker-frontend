import React from 'react';
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import Sidemenu from './Sidemenu.jsx';

const Navbar = ({ activeMenu }) => {
    const [openSideMenu, setOpenSideMenu] = React.useState(false);

    return (
        <div className="flex gap-5 bg-white border border-b border-gray-200/50 backdrop-blur-[2px] py-4 px-7 sticky top-0 z-30">
            {/* Mobile Menu Toggle Button */}
            <button className="block lg:hidden text-black" onClick={() => setOpenSideMenu(!openSideMenu)}>
                {openSideMenu ? <HiOutlineX className="text-2xl" /> : <HiOutlineMenu className="text-2xl" />}
            </button>

            {/* App Title */}
            <h2 className="text-lg font-medium text-black">Expense Tracker</h2>

            {/* Mobile Sidebar */}
            {openSideMenu && (
                <div className="fixed top-[61px] left-0 w-full h-screen bg-white shadow-md z-40">
                    <Sidemenu activeMenu={activeMenu} />
                </div>
            )}
        </div>
    );
};

export default Navbar;
