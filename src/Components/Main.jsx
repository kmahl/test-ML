import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import Result from './Result/Result.jsx'
import Detail from './Detail/Detail.jsx'
import Home from './Home/Home.jsx'
class Main extends Component {
  constructor(props) {
    super(props);
  }
  //se aplica la configuracion del BrowserRouter para que las 3 vistas se renderizen en un solo lugar,
  //dependiendo de la ruta donde se encuentre (cree una vista adicional llamada HOME que está vacia)
  //ya que como requerimiento es que la aplicacion sea escalable, de esta forma se puede agregar contenido
  //a la pantalla principal que por ahora está vacia
  render() {
    return (
      <main>
        <div className="main">
          <Switch>
            <Route exact path="/" render={props => <Home {...props} />} />
            <Route exact path="/items" render={props => <Result {...props} />} />
            <Route exact path="/items/:id" render={props => <Detail {...props} />} />
          </Switch>
        </div>
      </main>
    )
  }
}
export default Main