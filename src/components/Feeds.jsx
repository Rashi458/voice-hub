import React, { useEffect, useState } from "react";
import AddPost from "./AddPost";
import Navbar from "./Navbar";
import Post from './post'
import auth, {db} from '../firebase'
import { Component } from "react";
import Suggestion from "./suggestions";
import Notification from './notification'
class Feeds extends Component {
  constructor(props){
    super(props);
    this.state={
      audio:[]
    }
    if(window.userDoc!= undefined)
        window.userDoc=auth
  }
  componentDidMount(){
        db.collection("post")
    .onSnapshot((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          console.log(doc.data())
          this.setState({
           audio:[...this.state.audio,{
             url:doc.data().audio,
             handle:doc.data().handle,
             des:doc.data().description,
             postImage:doc.data().image
           }],
          })
        });
    });
  }
  render(){
    console.log(this.state)
  return (
    <div style={{
      height:"100vh"
    }}>
     
      <Navbar></Navbar>
      <div style={{
        paddingLeft:"10%",
        paddingRight:"10%"
      }}>
      <AddPost ></AddPost>
      <Suggestion></Suggestion>
      {this.state.audio.map((data)=>(
               <div className='posts'>
                 <br></br>
                <Post nameData={data.handle} audioUrl={data.url} image={data.postImage} description={data.des} ></Post><br></br>
               </div>
               ))} 
     </div>
    </div>
  );
}
}
export default Feeds;
