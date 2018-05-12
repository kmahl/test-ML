import React, { Component } from "react";
//import './App.css';
import { BrowserRouter } from "react-router-dom";
import Header from "./Components/Header.jsx";
import Main from "./Components/Main.jsx";
const App = () => (
  <BrowserRouter>
    <div>
      <Header />
      <Main />
    </div>
  </BrowserRouter>
);
export default App;
