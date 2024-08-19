import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../contexts/Auth";

export function PrivateRoute() {
    const { user, signOut } = useAuth()

    return user ? (
        <Outlet />
    ) : (
      <Navigate to="/" />
    );
}
