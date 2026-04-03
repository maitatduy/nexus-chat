import { useAuthStore } from "@/stores/useAuthStore";
import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoutes() {
    const { accessToken } = useAuthStore();
    if (!accessToken) {
        return <Navigate to='/sign-in' replace />;
    }
    return <Outlet></Outlet>;
}
