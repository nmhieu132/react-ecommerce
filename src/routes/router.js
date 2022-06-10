import Dashboard from "../components/admin/Dashboard";
import Profile from "../components/admin/Profile";
import Login from "../components/frontend/auth/Login";
import Register from "../components/frontend/auth/Register";
import Home from "../components/frontend/Home"
export const router = [
    {path: "/admin", exact: true, name: 'Admin' },
    {path: "/admin/dashboard", exact: true, element : <Dashboard/> },
    {path: "/admin/profile", exact: true , element : <Profile/> },
    {path: "/register", exact: true, element: <Register/>},
    {path: "/login", exact: true, element: <Login/>},
    {path:"/",exact: true, element: <Home/>}
]