import React from 'react'
import { Component } from 'react';
class User extends Component{
    constructor(props){
        super(props)
    }
    handleMove=()=>{
        window.open('/profile?name='+this.props.handle,"_self")
    }
    render(){
        return(
            <div class="det" onClick={this.handleMove}>
                <p>@{this.props.handle}</p>
                <img src={this.props.image} class="imageA" ></img>
                <p>{this.props.name}</p>
            </div>
        )
    }
}
export default User