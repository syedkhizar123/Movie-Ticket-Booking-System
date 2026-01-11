import { Outlet } from "react-router-dom";
import { AdminNavbar } from "../Components/AdminNavbar";
import { AdminSidebar } from "../Components/AdminSidebar";

export const AdminLayout = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <AdminNavbar />
            <div className="flex flex-1">
                <AdminSidebar />
                <div className="flex-1 p-5 overflow-y-auto">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};
