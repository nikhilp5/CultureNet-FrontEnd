import Navbar from './components/Navbar';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { appTheme } from './themes/theme';

function App() {
  return (
    <ThemeProvider theme={appTheme}>
      <CssBaseline enableColorScheme />
      <div>
        <Navbar />
      </div>
    </ThemeProvider>
  );
}

export default App;
