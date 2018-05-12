import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import queryString from 'query-string';
import request from "request";
class Result extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results: [],
      isLoading: false,
      error: null,
    }
  }
  componentDidMount() {
    //se obtiene el valor de ''q'' del uri por medio de queryStrings ya que ''this.props.location.query'' no existe para la v4 de react Router 
    const query =  queryString.parse(this.props.location.search);
    //se establece isLoading=true para mostrar el mensaje de buscando...
    this.setState({ isLoading: true });
    //llamado al api utilizando el metodo fetch, actualmente es la forma mas optima ya que funciona con promesas
    fetch(`/api/items?q=${query.search}`)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Algo salió mal ...');
        }
      })
      .then(data => this.setState({results:data.items, isLoading:false}))
      .catch(error => this.setState({ error, isLoading: false }));
  }
  render() {
    //creo variables para ser usadas en el renderizado
    const { results, isLoading, error } = this.state;
    //Si no es response.ok retorna esta vista
    if (error) {
      return <p>{error.message}</p>;
    }
    //mientras isLoading=true
    if (isLoading) {
      return <p>Buscando...</p>;
    }
    //si response es ok y loading es false se procede a mapear la lista de items
    return (
      <div>
        {results.map(item =>
          <div key={item.id}>
            <a href='#'>{item.title}</a>
          </div>
        )}
      </div>
    );
  }
}
export default Result
