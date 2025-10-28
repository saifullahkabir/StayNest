import { Outlet } from "react-router-dom";
import Sidebar from "../components/Dashboard/Sidebar/Sidebar";

import useAuth from "../hooks/useAuth";
import ScrollToTop from "../components/Shared/ScrollToTop";

const DashboardLayout = () => {
    const { loading } = useAuth();
    if (loading) return;
    return (
        <div className="relative min-h-screen md:flex">
            <ScrollToTop />
            {/* Sidebar */}
            <div>
                <Sidebar></Sidebar>
            </div>
            {/* Outlet --> Dynamic content */}
            <div className="flex-1 md:ml-52 xl:ml-64 ">
                <div className="p-5">
                    <Outlet></Outlet>
                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;