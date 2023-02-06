import DrawerAppBar from './components/Navbar';
import ForgotPassword from './pages/ForgotPassword';
import Registration from './pages/Registration';
import UserProfile from './pages/UserProfile';
import Login from './pages/Login';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
  Link,
} from 'react-router-dom';

function App() {
  return (
    <Router>
      <DrawerAppBar />
      <Routes>
        <Route path='/' element={<Registration />} />
        <Route path='/register' element={<Registration />} />
        <Route path='/login' element={<Login />} />
        <Route path='/forgotpassword' element={<ForgotPassword />} />
        <Route path='/profile' element={<UserProfile />} />
        {/* <Route path='*' element={<NoMatch />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
