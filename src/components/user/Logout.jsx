// Author: Monil Hitesh Andharia (B00884813)

import { useEffect, useContext } from "react";
import { useNavigate } from "react-router";
import { UserContext } from "../../utils/UserContext";

const Logout = () => {
  const navigate = useNavigate();
  const { setOpenSnackbar, setSnackbarMessage, setSnackbarSeverity } = useContext(UserContext);

  useEffect(() => {
    localStorage.clear();
    setSnackbarSeverity("success");
    setSnackbarMessage("User logged out");
    setOpenSnackbar(true);
    navigate("/");
  }, []);


  return (<div></div>);
};

export default Logout;