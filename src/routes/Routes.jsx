import React from "react";
import { Route, Routes } from 'react-router-dom';
import LandingPage from '../components/common/LandingPage';
import Navbar from "../components/common/Navbar";
import UserDashboard from "../components/user/UserDashboard"
import AdminDashboard from "../components/admin/AdminDashboard"


export const AppRoutes = () => {
    return (
        <Routes>
            <Route path = "/" element = {<LandingPage />} />
            <Route path = "/UserDashboard" element = {<UserDashboard />} />
            <Route path = "/AdminDashboard" element = {<AdminDashboard />} />
            <Route path = "/Navbar" element = {<Navbar />} />
        </Routes>
    )
};