import React ,{Component, useEffect} from 'react'
import Like from './common/like'
import Popup from './popup'
import CommentBox from './comments'
import { Link, Redirect } from "react-router-dom";
import '../style/POST.css';
import Profile from './Profile'
import { useHistory } from "react-router-dom";
import auth from '../firebase';
 class Post extends Component{
    constructor(props){
        super(props);
        
            const {nameData}=props;
            const {postnumber}=props;
            
        this.state={
            name:"",
            src:"",
            postIndex:postnumber,
            play:false,
            isOpen:false
        }
       
        console.log("11");
        console.log(this.state);
        
    }   
    audio = new Audio()
    togglePopup = () => {
        this.setState({isOpen: !this.state.isOpen})
      }
    handleImageClick = (e) => {
       
       if(!this.props.callingSelf )
       window.open("/profile?name="+this.props.nameData,"_self"); 
        
      }
     togglePlay = () => {
        this.setState({ play: !this.state.play }, () => {
          this.state.play ? this.audio.play() : this.audio.pause();
        });
        this.audio.loop=false;
      }
      render(){
          console.log("12")
        //   if(this.state.src==undefined)
        //     return null
        this.audio.src=this.props.audioUrl
      console.log("post rendered")
      console.log(this.state)
        return (
            
            
            <div class="post">
            <div class="mainmedia">
           
            <div class="container-audio" >
            <button class="playpause" onClick={this.togglePlay}>{this.state.play ? 'sound' : 'mute'}</button>
                    <div class="userD" onClick={this.handleImageClick}>
                        <img src={this.props.image} class="imageA" >
                        </img>
                        <p class="postdata">{this.props.nameData}</p>
                    </div>
                    <div class="check">
                    <p >{this.props.description} </p>
                  
                    <div class="animate">
                        <div class="colum1">
                            <div class="row"></div>
                        </div>
                        <div class="colum1">
                            <div class="row"></div>
                        </div>
                        <div class="colum1">
                            <div class="row"></div>
                        </div>
                        <div class="colum1">
                            <div class="row"></div>
                        </div>
                        <div class="colum1">
                            <div class="row"></div>
                        </div>
                        <div class="colum1">
                            <div class="row"></div>
                        </div>
                        <div class="colum1">
                            <div class="row"></div>
                        </div>
                        <div class="colum1">
                            <div class="row"></div>
                        </div>
                        <div class="colum1">
                            <div class="row"></div>
                        </div>
                        <div class="colum1">
                            <div class="row"></div>
                        </div>
                        <div class="colum1">
                            <div class="row"></div>
                        </div>
                        <div class="colum1">
                            <div class="row"></div>
                        </div>
                        <div class="colum1">
                            <div class="row"></div>
                        </div>
                        <div class="colum1">
                            <div class="row"></div>
                        </div>
                        <div class="colum1">
                            <div class="row"></div>
                        </div>
                        <div class="colum1">
                            <div class="row"></div>
                        </div>
                        <div class="colum1">
                            <div class="row"></div>
                        </div>
                        <div class="colum1">
                            <div class="row"></div>
                        </div>
                    </div>
                
                    </div>
               <div class="actionMenu">
        <Like></Like>
        <button class="commentclick" onClick={()=>{
            alert("reported we will see!!")
        }}  onClick={this.togglePopup}>COMMENT</button>
        {  
                          this.state.isOpen && <Popup content={<>
                          
                           <CommentBox></CommentBox>
                           </>}
      handleClose={this.togglePopup}
    />}
       
       </div>
      
        <button class="report" onClick={()=>{
            alert("reported we will see!!")
        }}>   !   </button>
        
     </div>
        {/* <button class="like-btn"> Like </button> */}
        </div>
        </div>
        )
    }
}

export default Post
