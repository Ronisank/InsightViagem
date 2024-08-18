import { LogOut, MapPinPlus, User } from "lucide-react";
import { Link, Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/Auth";

export function PrivateRoute() {
    const { user, signOut } = useAuth()

    return user ? (
        <div className="container-dashboard">
            <div className="header">
                <div className="user">
                    <User size={24} />
                    <span>{user.nome}</span>
                </div>
                <Link to={"/dashboard/locais"}><MapPinPlus size={24}/></Link>
                <button onClick={signOut} className="logout">
                    <LogOut size={24} />
                </button>
            </div>
            <Outlet />
        </div>
    ) : (
        <Navigate to="/" />
    )
}