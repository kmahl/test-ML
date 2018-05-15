import React, { Component } from 'react'
import queryString from 'query-string';
import Item from '../Item/Item.jsx';
import Breadcrumb from '../Breadcrumb/Breadcrumb.jsx';
import _Result from './_Result.scss';
class Result extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results: [],
      isLoading: false,
      error: null,
    }
  }
  //esta función se invoca inmediatamente después de montar el componente, y puedo disponer de las props recibidas
  componentDidMount() {
    if (this.props.location.search)
      this._getApiData(this.props.location.search);
    else
      this.props.history.push('/')
  }
  //esta funcion se invoca justo antes de que el componente reciba nuevas props, es muy util para actualizar datos
  componentWillReceiveProps(nextProps) {
    if (nextProps.location.search !== this.props.location.search) {
      this.setState({ results: null });
      this._getApiData(nextProps.location.search);
    }
  }
  /**
 * Funcion que realiza un fetch y asigna a "results" la data recibida.
 * @param {string} search - ruta del apiRest a realizar la consulta.
 */
  _getApiData(search) {
    //se obtiene el valor de "search" del uri por medio de queryStrings ya que ''this.props.location.query'' no existe para la v4 de react Router 
    let query = queryString.parse(search);
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
      .then(data => this.setState({ results: data, isLoading: false }))
      .catch(error => this.setState({ error, isLoading: false }));
  }
  render() {
    //creo variables para ser usadas en el renderizado
    const { results, isLoading, error } = this.state;
    //Si no es response.ok retorna esta vista
    if (error) {
      return <p>{error.message}</p>;
    }
    //mientras isLoading=true se pudiese mostrar algun texto o control
    if (isLoading) {
      return <p></p>
    }
    //si response es ok y loading es false se procede a mapear la lista de items
    if (results.items) {
      return (
        <div>
          <Breadcrumb key="breadcrumb" data={results.categories} />
          <div className="itemList">{results.items.map(item =>
            <Item key={item.id} item={item} ></Item>
          )}</div>
        </div>
      );
    }
    return (
      <div></div>
    );
  }
}
export default Result
