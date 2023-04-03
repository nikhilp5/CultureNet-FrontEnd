import { useEffect } from "react";
import { useNavigate } from "react-router";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.clear();
    navigate("/");
  }, []);


  return (<div></div>);
};

export default Logout;