import React from 'react'
import { Link } from 'react-router-dom'
import SearchBar from './SearchBar.jsx'
// The Header creates links that can be used to navigate
// between routes.
const Header = () => (
  <header>
    <SearchBar></SearchBar>
  </header>
)

export default Header