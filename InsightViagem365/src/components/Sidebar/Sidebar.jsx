import {
  HomeIcon,
  LogOut,
  MapPinPlus,
  Table2Icon,
  User,
} from "lucide-react";
import { Link, Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../contexts/Auth";

export function Sidebar() {
  const { user, signOut } = useAuth();

  return user ? (
    <>
      <div className="elements-sidebar">
        <div className="user">
          <User size={28} className="user"/>
          <span>Olá, {user.nome}</span>
        </div>
        <div className="home">
          <Link to={"/dashboard"}>
            <HomeIcon size={28}/>
          </Link>
          <span>Home</span>
        </div>
        <div className="locations">
          <Link to={"/dashboard/tabelaLocais"}>
            <Table2Icon size={28} className="mappin" />
          </Link>
          <span>Tabela Locais</span>
        </div>
        <div className="locations">
          <Link to={"/dashboard/cadastrarLocais"}>
            <MapPinPlus size={28} className="mappin" />
          </Link>
          <span>Locais</span>
        </div>
        <div className="exit">
          <button onClick={signOut} className="logout">
            <LogOut size={28} />
          </button>
          <span>Sair</span>
        </div>
      </div>
      <Outlet />
    </>
  ) : (
    <Navigate to="/" />
  );
}
