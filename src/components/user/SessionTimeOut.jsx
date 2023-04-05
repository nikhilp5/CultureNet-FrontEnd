import { useEffect, useContext } from "react";
import { useNavigate } from "react-router";
import { UserContext } from "../../utils/UserContext";

const SessionTimeOut = () => {
  const navigate = useNavigate();
  const { setOpenSnackbar, setSnackbarMessage, setSnackbarSeverity } = useContext(UserContext);

  useEffect(() => {
    localStorage.clear();
    setSnackbarSeverity("error");
    setSnackbarMessage("Session timed out. Please login again");
    setOpenSnackbar(true);
    navigate("/Login");
  }, []);


  return (<div></div>);
};

export default SessionTimeOut;