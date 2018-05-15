import React, { Component } from 'react'
import Breadcrumb from '../Breadcrumb/Breadcrumb.jsx'
import _Detail from './_Detail.scss'
class Detail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: {}
    }
  }
  //esta función se invoca inmediatamente después de montar el componente, y puedo disponer de las props recibidas
  componentDidMount() {
    this._getApiData(this.props.match.params.id);
  }
  /**
 * Funcion que realiza un fetch y asigna a "item" toda la información detallada de un producto.
 * @param {string} id - ID del producto para obtener todo su detalle.
 */
  _getApiData(id) {
    //llamado al api utilizando el metodo fetch, actualmente es la forma mas optima ya que funciona con promesas
    fetch(`/api/items/${id}`)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Algo salió mal ...');
        }
      })
      .then(data => this.setState({ item: data.item }))
      .catch(error => console.log('no se obtuvo respuesta del servidor'));
  }

  render() {
    const { item } = this.state;
    if (item.id) {
      return (
        <div>
          <Breadcrumb key="breadcrumb" data={item.categories} />
          <div className="detail">
            <div className="info">
              <div>
                <div className="image">
                  <img src={item.picture} alt="" />
                </div>
                <div className="text">
                  <span className="condition">{item.condition} - {item.sold_quantity} {item.sold_quantity > 1 ? "vendidos" : "vendido"}</span>
                  <span className="title">{item.title}</span>
                  <div className="price">
                    <span>$ {formatNumber(item.price.amount)}</span>
                    <span className='decimal'>{item.price.decimals === 0 ? '' : item.price.decimals}</span>
                  </div>
                  <button>Comprar</button>
                </div>
              </div>
            </div>
            <div className="description">
              <span>Descripción del producto</span>
              <p>{item.description}</p>
            </div>
          </div>
        </div>
      );
    }
    return (
      <div></div>
    )
  }
}
/**
* Funcion que realiza la separación de cada mil del numero ingresado Ej: 1000 -> 1.000
* @param {number} num - numero a procesar.
*/
function formatNumber(num) {
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")
}
export default Detail