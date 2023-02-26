import React from "react";
import { Route, Routes as Rt } from 'react-router-dom';
import LandingPage from '../components/common/LandingPage';
import Navbar from "../components/common/Navbar";
import UserDashboard from "../components/user/UserDashboard"
import AdminDashboard from "../components/admin/AdminDashboard"

const Routes = () => {
    return (
        <Rt>
            <Route path = "/" element = {<LandingPage />} />
            <Route path = "/UserDashboard" element = {<UserDashboard />} />
            <Route path = "/AdminDashboard" element = {<AdminDashboard />} />
            <Route path = "/Navbar" element = {<Navbar />} />
        </Rt>
    )
};

export default Routes;