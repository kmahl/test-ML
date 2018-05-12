import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import request from "request";
class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchVal: ''
    }
  }
  getSearchUrl() {
    let searchVal = "telefono"
			return `/items?search=${this.state.searchVal}`
  }
  render() {
    return (
      <div>
        <input  />
        <Link to={`/`}>home</Link>
        <Link to={this.getSearchUrl()}>
         aquies
        </Link>
      </div>
    )
  }
}
export default SearchBar