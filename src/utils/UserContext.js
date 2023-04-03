import React, { useEffect, useState } from 'react';

export const UserContext = React.createContext();
export const ContextProvider = ({ children }) => {
  const [auth, setAuth] = React.useState(false);

  return (
    <UserContext.Provider value={{ auth, setAuth }}>
      {children}
    </UserContext.Provider>
  );
};
