import React,{useEffect} from 'react'
import {Redirect} from 'react-router-dom';
import logo from '../logo.png'
import '../style/start.css'
function StartScreen (props)  {
    useEffect(() => {
        const url_string = window.location;
      const url = new URL(url_string);
      const name = url.searchParams.get("sessionexpire");
        if(name!=null)
        alert("session expire please login in again")
      }, []);


    return (
        <div class="splash">            
            <img src={logo} alt="logo" class="logo"></img>
            <button class="start" onClick={()=>{
                 props.history.push("/login");
            }}>start</button>
        </div>
        
    )
}

export default StartScreen
