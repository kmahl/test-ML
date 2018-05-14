import React from 'react'
import { Link } from 'react-router-dom'
import SearchBar from './SearchBar.jsx'
import logo from '../Assets/Logo_ML.png'
// The Header creates links that can be used to navigate
// between routes.
const Header = () => (

  <header>
    <div className="Header">
      <div className="logo">
        <Link to="/"><img src={logo} alt="" /></Link>
      </div>
      <SearchBar></SearchBar>
    </div>
  </header>

)

export default Header