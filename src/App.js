import React, { useState} from "react";
import "./App.css";
import ResponsiveAppBar from "./components/Navbar"; 
import CardBootstrap from "./components/Cards";
import Data from "./testdata";
import SearchAppBar from "./components/SearchBar";


const App = () => {
  const [item, setItem] = useState(Data);
  return (
    <>
    <ResponsiveAppBar />
    <SearchAppBar />
      <div className="container-fluid">
        <div className="row">
          <h1 className="col-12 text-center my-3 fw-bold">Book Library</h1>
          <CardBootstrap item={item} />
        </div>
      </div>
    </>
  );
};
 
export default App;