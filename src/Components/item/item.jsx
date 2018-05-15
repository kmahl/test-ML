import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import free_shipping from '../../Assets/ic_shipping.png'
import _Item from './_Item.scss'
class Item extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="box">
        <div className="itemCard">
          <div className="image">
            <Link to={`/items/` + this.props.item.id}>
              <img src={this.props.item.picture} alt="" />
            </Link>
          </div>
          <div className="shortDescription">
            <div className="price">
              <span>$ {formatNumber(this.props.item.price.amount)}</span>
              <span className='decimal'>{this.props.item.price.decimals === 0 ? '' : this.props.item.price.decimals}</span>
              <img src={this.props.item.free_shipping ? free_shipping : ""} alt="" />
            </div>
            <Link to={`/items/` + this.props.item.id}>{this.props.item.title}</Link>
            <span>{this.props.item.condition}</span>
          </div>
          <div className="location">
            <span>{this.props.item.location}</span>
          </div>
        </div>
      </div>
    );
  }
}
/**
* Funcion que realiza la separación de cada mil del numero ingresado Ej: 1000 -> 1.000
* @param {number} num - numero a procesar.
*/
function formatNumber(num) {
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")
}
export default Item