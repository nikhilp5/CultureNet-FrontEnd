import React from "react";
import { Route, Routes } from 'react-router-dom';
import LandingPage from '../components/common/LandingPage';
import DefaultNotFound from '../components/common/DefaultNotFound';
import Navbar from "../components/common/Navbar";
import UserDashboard from "../components/user/UserDashboard";
import AdminDashboard from "../components/admin/AdminDashboard";
import WatchListContent from "../components/watchlist/watchListContent/WatchListContent";
import SearchedContent from "../components/searchpage/searchedContent/SearchedContent";
import Login from "../components/user/Login";
import Logout from "../components/user/Logout";
import SessionTimeOut from "../components/user/SessionTimeOut";
import Registration from "../components/user/Registration";
import ForgotPassword from "../components/user/ForgotPassword";
import UserProfile from "../components/user/UserProfile";
import Movie from "../components/Movies/ListOfMovies";
import ListOfMovies from "../components/Movies/ListOfMovies";
import MovieDetails from "../components/Movies/MovieDetails";
import UserMovies from "../components/user/userContent/UserMovies";
import UserBooks from "../components/user/userContent/UserBooks";
import UserMusic from "../components/user/userContent/UserMusic";
import BookCard from "../components/book/BooksGrid";
import BookDetails from "../components/book/BookDetail";
import WatchedContent from "../components/watchlist/watchedContent/WatchedContent";
import ConfigureMovies from "../components/admin/movies/ConfigureMovies";
import AddMovie from "../components/admin/movies/AddMovie";
import UpdateMovie from "../components/admin/movies/UpdateMovie";
import DeleteMovie from "../components/admin/movies/DeleteMovie";
import ConfigureBooks from "../components/admin/books/ConfigureBooks";
import AddBook from "../components/admin/books/AddBook";
import UpdateBook from "../components/admin/books/UpdateBook";
import DeleteBook from "../components/admin/books/DeleteBook";
import ConfigureMusic from "../components/admin/music/ConfigureMusic";
import AddMusic from "../components/admin/music/AddMusic";
import UpdateMusic from "../components/admin/music/UpdateMusic";
import DeleteMusic from "../components/admin/music/DeleteMusic";

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path='*' element={<DefaultNotFound />} />
            <Route path="/UserDashboard" element={<UserDashboard />} />
            <Route path="/AdminDashboard" element={<AdminDashboard />} />
            <Route path="/Navbar" element={<Navbar />} />
            <Route path="/Watchlist" element={<WatchListContent />}></Route>
            <Route path="/Watched" element={<WatchedContent />}></Route>
            <Route path="/Search" element={<SearchedContent />}></Route>
            <Route path="/Login" element={<Login />}></Route>
            <Route path="/Register" element={<Registration />}></Route>
            <Route path="/ForgotPassword" element={<ForgotPassword />}></Route>
            <Route path="/Profile" element={<UserProfile />}></Route>
            <Route path="/Movies" element={<ListOfMovies />}></Route>
            <Route path="/MovieDetail" element={<MovieDetails />}></Route>
            <Route path="/MyMovies" element={<UserMovies />}></Route>
            <Route path="/MyMusic" element={<UserMusic />}></Route>
            <Route path="/MyBooks" element={<UserBooks />}></Route>
            <Route path="/Books" element={<BookCard />}></Route>
            <Route path="/BookDetail" element={<BookDetails />}></Route>
            <Route path="/Logout" element={<Logout />}></Route>
            <Route path="/SessionTimeOut" element={<SessionTimeOut />}></Route>
            <Route path="/ConfigureMovies" element={<ConfigureMovies />} />
            <Route path="/AddMovie" element={<AddMovie />} />
            <Route path="/UpdateMovie" element={<UpdateMovie />} />
            <Route path="/DeleteMovie" element={<DeleteMovie />} />
            <Route path="/ConfigureBooks" element={<ConfigureBooks />} />
            <Route path="/AddBook" element={<AddBook />} />
            <Route path="/UpdateBook" element={<UpdateBook />} />
            <Route path="/DeleteBook" element={<DeleteBook />} />
            <Route path="/ConfigureMusic" element={<ConfigureMusic />} />
            <Route path="/AddMusic" element={<AddMusic />} />
            <Route path="/UpdateMusic" element={<UpdateMusic />} />
            <Route path="/DeleteMusic" element={<DeleteMusic />} />
        </Routes>
    );
};

export default AppRoutes;