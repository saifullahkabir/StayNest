import { Outlet } from "react-router-dom";
import Sidebar from "../components/Dashboard/Sidebar/Sidebar";
import useRole from "../hooks/useRole";
import LoadingSpinner from "../components/Shared/LoadingSpinner";
import useAuth from "../hooks/useAuth";

const DashboardLayout = () => {
    const {loading} = useAuth();
    if(loading)  return <LoadingSpinner></LoadingSpinner>
    return (
        <div className="relative min-h-screen md:flex">
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