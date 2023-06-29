import React from 'react'
import { Component } from 'react';
import {db} from '../firebase'
import User from './User'
class Suggestion extends Component{
   constructor(props){
       super(props)
       this.state={
           data:[],
           isOpen:true
       }
   }

   componentDidMount(){
    db.collection("user")
    .get().then(querySnapshot => {
      querySnapshot.forEach((doc)=>{
        this.setState({
          data:[...this.state.data,{name: doc.data().name,
          handle:doc.data().handle,
          follower:doc.data().followers_count,
          following:doc.data().following_count,
          image: doc.data().photoUrl 
        }]})
      })
     })
   }
   toggleSuggestion = () => {
    this.setState({isOpen: !this.state.isOpen})
  }
   render(){
       return(
           <div style={{
               display:(this.state.isOpen ? "inline" : "none")
           }} >
               <div style={{
                   display:"flex",
                   justifyContent:"space-between"
               }}>
               <p>Other Users</p>
               <button class="report" onClick={this.toggleSuggestion}>X</button>
               </div>
           <div class="listing" style={{
               display:"flex",
               justifyContent:"space-between"
               
           }}>
                                 {
                       this.state.data.map((display)=>(
                        <User name={display.name} image={display.image} handle={display.handle}></User>
                 ))}
               
           </div>
                    
           </div>
       )
   }
}
export default Suggestion;