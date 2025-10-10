import { Footer } from "../Components/layout/Footer";
import { Navbar } from "../Components/layout/Navbar";


import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HomePage } from "../Pages/Home/HomePage";



const AppRoutes = () => (
    <Router>
        <Navbar />
        <Routes>
            <Route  path="/" element={<HomePage/>}/>
        </Routes>
        <Footer/>
    </Router>
    
);

export default AppRoutes;