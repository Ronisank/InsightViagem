import { LogOut, User } from "lucide-react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/Auth";

export function PrivateRoute() {
    const { user, signOut } = useAuth()

    return user ? (
        <div className="container">
            <div className="header">
                <div className="user">
                    <User size={24} />
                    <span>{user.nome}</span>
                </div>
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