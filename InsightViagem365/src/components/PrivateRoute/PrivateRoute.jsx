import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../contexts/Auth";

export function PrivateRoute() {
    const { user, signOut } = useAuth()

    return user ? (
      // <div className="container-dashboard parent">
      //   <div className="header">
      //     <div className="user">
      //       <User size={28} />
      //       <span>Olá, {user.nome}</span>
      //     </div>
      //     <div className="locations">
      //       <Link to={"/dashboard"}>
      //         <Home size={28} className="mappin" />
      //       </Link>
      //       <span>Dashboard</span>
      //     </div>
      //     <div className="locations">
      //       <Link to={"/dashboard/locais"}>
      //         <MapPinPlus size={28} className="mappin" />
      //       </Link>
      //       <span>Locais</span>
      //     </div>
      //     <div className="exit">
      //     <button onClick={signOut} className="logout">
      //       <LogOut size={28} />
      //     </button>
      //       <span>Sair</span>
      //       </div>
      //   </div>
        <Outlet />
      // </div>
    ) : (
      <Navigate to="/" />
    );
}