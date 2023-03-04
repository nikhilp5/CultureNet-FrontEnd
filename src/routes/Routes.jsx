import React from "react";
import { Route, Routes } from 'react-router-dom';
import LandingPage from '../components/common/LandingPage';
import DefaultNotFound from '../components/common/DefaultNotFound';
import Navbar from "../components/common/Navbar";
import UserDashboard from "../components/user/UserDashboard";
import AdminDashboard from "../components/admin/AdminDashboard";
import WatchedContent from "../components/watchlist/watchedContent/WatchedContent";
import WatchListContent from "../components/watchlist/watchListContent/WatchListContent";
import SearchedContent from "../components/searchpage/searchedContent/SearchedContent";
import AddContent from "../components/watchlist/addContent/AddContent";
import Login from "../components/user/Login";
import Registration from "../components/user/Registration";
import ForgotPassword from "../components/user/ForgotPassword";
import UserProfile from "../components/user/UserProfile";
import UserMovies from "../components/user/userContent/UserMovies";
import UserBooks from "../components/user/userContent/UserBooks";
import UserMusic from "../components/user/userContent/UserMusic";


const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path='*' element={<DefaultNotFound />}/>
            <Route path="/UserDashboard" element={<UserDashboard />} />
            <Route path="/AdminDashboard" element={<AdminDashboard />} />
            <Route path="/Navbar" element={<Navbar />} />
            <Route path="/Watchlist" element={<WatchListContent />}></Route>
            <Route path="/Watched" element={<WatchedContent />}></Route>
            <Route path="/Add" element={<AddContent />}></Route>
            <Route path="/Search" element={<SearchedContent />}></Route>
            <Route path="/Login" element={<Login />}></Route>
            <Route path="/Register" element={<Registration />}></Route>
            <Route path="/ForgotPassword" element={<ForgotPassword />}></Route>
            <Route path="/Profile" element={<UserProfile />}></Route>            
            <Route path="/MyMovies" element={<UserMovies />}></Route>            
            <Route path="/MyMusic" element={<UserMusic />}></Route>
            <Route path="/MyBooks" element={<UserBooks />}></Route>
        </Routes>
    );
};

export default AppRoutes;