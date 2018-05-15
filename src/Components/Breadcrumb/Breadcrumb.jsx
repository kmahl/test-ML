import React, { Component } from 'react'
import _Breadcrumb from './_Breadcrumb.scss'
class Breadcrumb extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        if (this.props.data) {

            return (
                <div className="Breadcrumb">
                    {this.props.data.map((category, index) => 
                        this.props.data.length === (index + 1)? (<span key={index} className="last">{category}</span>):(<span key={index}>{category} > </span>)         
                    )}
                </div>
            );
        }
        return (
            <div className="Breadcrumb"></div>
        )
    }
}
export default Breadcrumb