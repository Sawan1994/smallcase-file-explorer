import React from "react";
import "./styles/base.css";
import Main from "./components/Main";
import SideBar from "./components/SideBar";

function App() {
  return <div className="window">
    <SideBar />
    <Main />
  </div>;
}

export default App;
