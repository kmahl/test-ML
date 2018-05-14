import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import buttonIcon from '../Assets/ic_Search.png'
class SearchBar extends Component {

  constructor(props, context) {
    super(props, context);
    this.submitForm = this.submitForm.bind(this);
    this.state = {
      query: '',
      fireRedirect: false
    }
  }

  handleInputChange(e) {
    let query = e.target.value
    this.setState({
      query: query
    })
  }

  submitForm(e) {
    e.preventDefault()
    if (this.state.query) {
      this.props.history.push({
        pathname: '/items',
        search: `search=${this.state.query}`
      })
    }
  }

  render() {
    const { query } = this.state;
    return (
      <div className="searchBar">
        <form onSubmit={this.submitForm}>
          <input
            type="text"
            placeholder="Nunca dejes de buscar"
            value={query}
            onChange={(e) => this.handleInputChange(e)}

          />

          <button type="submit">
            <i className="icon-search">
              <img src={buttonIcon} alt="Buscar" />
            </i></button>
        </form>
      </div>
    )
  }
}
export default withRouter(SearchBar)