import DrawerAppBar from './components/Navbar';
import Registration from './pages/Registration';
import UserProfile from './pages/UserProfile';

function App() {
  return (
    <div className='App'>
      <header className='App-header'></header>
      <DrawerAppBar />
      {/* <Registration /> */}
      <UserProfile />
    </div>
  );
}

export default App;
