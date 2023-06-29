import React from 'react'
import { Component } from 'react'
import Dropdown from 'react-bootstrap/Dropdown'
class Nitem extends Component {
    constructor(props){
        super(props);
    }
    render(){
        console.log(this.props.name)
    return (
        <p >{this.props.name}<br></br>{this.props.action}</p>
    )
    }
}

export default Nitem
