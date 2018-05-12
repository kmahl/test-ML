import React, {Component} from 'react'

class Detail extends Component{
  constructor(props){
    super(props)
  }

  render(){
    return(
      <div>
    {this.props.id}
  </div>
    );
  }
}

export default Detail