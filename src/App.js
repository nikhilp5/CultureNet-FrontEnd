import React, { useState} from "react";
import "./App.css";
import ResponsiveAppBar from "./components/Navbar"; 
import CardBootstrap from "./components/Cards";
import Data from "./testdata";
import SearchAppBar from "./components/SearchBar";
import Buttons from "./components/FilterButton";


const App = () => {
  const [item, setItem] = useState(Data);
  const menuItems = [...new Set(Data.map((Val) => Val.category))];
  const filterItem = (curcat) => {
  const newItem = Data.filter((newVal) => {
      return newVal.category === curcat;
    });
    setItem(newItem);
  };
  return (
    <>
    <ResponsiveAppBar />
    <SearchAppBar />
    <div className="container-fluid">
        <div className="row">
          {/* <h1 className="col-12 text-center my-3 fw-bold">Food Filtering App</h1> */}
          <Buttons
            filterItem={filterItem}
            setItem={setItem}
            menuItems={menuItems}
          />
          <CardBootstrap item={item} />
        </div>
      </div>
      {/* <div className="container-fluid">
        <div className="row">
          <h1 className="col-12 text-center my-3 fw-bold">Book Library</h1>
          <CardBootstrap item={item} />
        </div>
      </div> */}
    </>
  );
};
 
export default App;