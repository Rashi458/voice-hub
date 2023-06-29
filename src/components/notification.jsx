import React, { useState } from 'react'
import { Component } from 'react'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'
import Nitem from './notifyItem'
 class Notification extends Component {
     constructor(props){
         super(props)
         this.state={
             notify:[{
                 name:"admin",
                 action:"welcome"
             }]
         }
        }
    render(){
   
    return(
        <DropdownButton id="dropdown-basic-button" title="Dropdown button">
              {
                  this.state.notify.map((data)=>{
                      
                      <Nitem name={data.name} action={data.action}></Nitem>
                  })
              }
      </DropdownButton>
    )
}
 }
export default Notification