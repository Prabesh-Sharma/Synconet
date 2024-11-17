import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/home/Home";
import Dashboard from "./pages/home/pages/Dashboard";
import Analytics from "./pages/home/pages/Analytics";
import Events from "./pages/home/pages/Events";
import Network from "./pages/home/pages/Network";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

const App = () => {
    return (
        <main className="w-full h-screen flex flex-row relative">
            <BrowserRouter>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/" element={<Navigate to="/login" />} />
                    <Route path="/home" element={<Home />}>
                        <Route path="dashboard" element={<Dashboard />} />
                        <Route path="analytics" element={<Analytics />} />
                        <Route path="events" element={<Events />} />
                        <Route path="network" element={<Network />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </main>
    );
};

export default App;
