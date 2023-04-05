import React, { useState } from 'react';

export const UserContext = React.createContext();
export const ContextProvider = ({ children }) => {
  const [auth, setAuth] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  return (
    <UserContext.Provider
      value={{
        auth,
        setAuth,
        openSnackbar,
        setOpenSnackbar,
        snackbarMessage,
        setSnackbarMessage,
        snackbarSeverity,
        setSnackbarSeverity,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
