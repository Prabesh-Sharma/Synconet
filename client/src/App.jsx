import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import axios from "axios";
import Home from "./pages/home/Home";
import Dashboard from "./pages/home/pages/Dashboard";
import Analytics from "./pages/home/pages/Analytics";
import Events from "./pages/home/pages/Events";
import Network from "./pages/home/pages/Network";
import Login from "./pages/auth/Login";

axios.defaults.baseURL = "http://localhost:6969";

const isAuthenticated = true;

const App = () => {
    return (
        <main className="w-full h-screen flex flex-row relative">
            <BrowserRouter>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/" element={isAuthenticated ? <Navigate to="/home/dashboard" /> : <Navigate to="/login" />} />
                    <Route path="/home" element={isAuthenticated ? <Home /> : <Navigate to="/login" />}>
                        <Route path="dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} />
                        <Route path="analytics" element={isAuthenticated ? <Analytics /> : <Navigate to="/login" />} />
                        <Route path="events" element={isAuthenticated ? <Events /> : <Navigate to="/login" />} />
                        <Route path="network" element={isAuthenticated ? <Network /> : <Navigate to="/login" />} />
                    </Route>
                    <Route path="*" element={<Navigate to={isAuthenticated ? "/home/dashboard" : "/login"} />} />
                </Routes>
            </BrowserRouter>
        </main>
    );
};

export default App;
