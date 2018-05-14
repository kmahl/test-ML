import React, { Component } from "react";
import './styles/style.scss';
import { BrowserRouter } from "react-router-dom";
import Header from "./Components/Header.jsx";
import Main from "./Components/Main.jsx";
const App = () => (
  <BrowserRouter>
    <div className="container">
      <Header />
      <Main />
    </div>
  </BrowserRouter>
);
export default App;
