import React, { Component } from 'react'
import Breadcrumb from './Breadcrumb/Breadcrumb.jsx'
class Detail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: {}
    }
  }

  componentDidMount() {
    this._getApiData(this.props.match.params.id);
  }

  _getApiData(id) {

    //se establece isLoading=true para mostrar el mensaje de buscando...
    this.setState({ isLoading: true });
    //llamado al api utilizando el metodo fetch, actualmente es la forma mas optima ya que funciona con promesas
    fetch(`/api/items/${id}`)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Algo salió mal ...');
        }
      })
      .then(data => this.setState({ item: data.item, isLoading: false }))
      .catch(error => this.setState({ error, isLoading: false }));
  }

  render() {
    const { item } = this.state;
    if (item.id) {
      return (
        <div>
          <Breadcrumb key="breadcrumb" data={item.categories} />
          <div className="detail">
            <div className="info">
              <div className="image">
                <img src={item.picture} alt="" />
              </div>
              <div className="text">
                <span>{item.condition} - {item.sold_quantity} {item.sold_quantity > 1 ? "vendidos" : "vendido"}</span>
                <span>{item.title}</span>
                <div className="price">
                  <span>$ {formatNumber(item.price.amount)}</span>
                  <span className='decimal'>{item.price.decimals === 0 ? '' : item.price.decimals}</span>
                </div>
                <button>Comprar</button>
              </div>
            </div>
            <div className="description">
              <p>{item.description}</p>
            </div>
          </div>
        </div>
      );
    }
    return(
      <div></div>
    )
  }
}
function formatNumber(num) {
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")
}
export default Detail