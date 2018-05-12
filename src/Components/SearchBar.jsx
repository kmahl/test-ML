import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
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
    console.log(query)
    this.setState({
      query: query
    })
  }

  submitForm(e) {
    e.preventDefault()
    //if (this.state.query)

    this.props.history.push({
      pathname: '/items',
      search: `q=${this.state.query}`
    })
  }
  
  render() {
    const { query } = this.state;
    return (
      <div>
        <form onSubmit={this.submitForm}>
          <input
            type="text"
            placeholder="Nunca dejes de buscar"
            value={query}
            onChange={(e) => this.handleInputChange(e)}

          />
          <button type="submit">Buscar</button>
        </form>

      </div>
    )
  }
}
export default withRouter(SearchBar)