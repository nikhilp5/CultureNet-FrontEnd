import { useContext, useEffect } from "react";
import { useNavigate } from "react-router";
import { UserContext } from '../../utils/UserContext';

const Logout = () => {
  const { auth, setAuth } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.clear();
    setAuth(false);
    navigate("/");
  }, []);


  return (<div></div>);
};

export default Logout;