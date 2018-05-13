import React, { Component } from 'react'

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
    let res
   
    if (item) {
      console.log(item)
      res = <p itemProp="description" className="body">{item.description}</p>;
    }
    return (
      <div>
        {res}
      </div>
    );
  }
}

export default Detail