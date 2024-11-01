import { BrowserRouter, Routes, Route } from "react-router-dom"
import axios from "axios"
import Home from "./pages/home/Home";

axios.defaults.baseURL = "http://localhost:6969"

function App() {
    return (
        <div
            className="bg-gradient-to-r from-purple-300 to-purple-700 h-screen flex items-center justify-center"
        >
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
