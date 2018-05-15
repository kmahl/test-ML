import React, { Component } from "react";
import './styles/style.scss';
import { BrowserRouter } from "react-router-dom";
import Header from "./Components/Header.jsx";
import Main from "./Components/Main.jsx";
const App = () => (
  //como esquema principal cree la pagina dividiva en dos areas, Header y Main
  //como el componente de busqueda se encuentra en las 3 vistas quedara en el header estatico
  //y de esta forma no se va a renderizar cada vez, cambiando solamente el contenido del Main
  <BrowserRouter>
    <div className="container">
      <Header />
      <Main />
    </div>
  </BrowserRouter>
);
export default App;
