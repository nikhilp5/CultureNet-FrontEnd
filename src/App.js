import Navbar from './components/Navbar';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { appTheme } from './themes/theme';

// import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';

// const theme = createMuiTheme({
//   palette: {
//     primary: lightBlue,
//   },
//   overrides: {
//     MuiButton: {
//       raisedPrimary: {
//         color: 'white',
//       },
//     },
//   },
// });

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
