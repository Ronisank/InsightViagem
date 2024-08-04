import { Route, Routes } from 'react-router-dom';
import { PrivateRoute } from '../components/PrivateRoute';
import Dashboard from '../pages/Dashboard/Dashboarb';
import Login from '../pages/SignIn/Login';
import SignUp from '../pages/SignUp/SignUp';

export function AppRoutes() {
  return (
   <Routes>
    <Route path="/" element={<Login/>} />
    <Route path="/SignUp" element={<SignUp/>} />
        <Route path="/Dashboard" element={<PrivateRoute/>} />
        <Route path="/Dashboard" element={<Dashboard/>} />
    </Routes>
  )
}