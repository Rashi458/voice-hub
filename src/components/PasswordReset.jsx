import React, { useEffect, useRef, useState } from "react";
import { auth } from "../firebase";
import { Card, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from '../logo.png'
import Popup from './popup'
function PasswordReset(props) {
  const emailRef = useRef();
  const [isOpen,setOpen]=useState(false);
  const togglePopup = () => {
    setOpen(!isOpen)
  }

  const handleReset = (e) => {
    e.preventDefault();
    const email = emailRef.current.value;

    auth
      .sendPasswordResetEmail(email)
      .then(() => {
        console.log("Password change has been sent to you email");
      })
      .catch((e) => {
        console.log("Passwprd reset ", e);
      });
  };

  return (
    <div className="container mt-0 w-50"
    style={{
      width:100+ "vw",
      height:100+"vh",
    }}>
       <img src={logo}></img>
      <Card bg="dark" style={{
        color:"cyan",
      }}>
        <Card.Body>
          <h2 className="text-center mb-4">Password Reset</h2>
          <Form onSubmit={handleReset}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required style={{
                backgroundColor:"transparent",
                borderColor:"cyan"
              }}/>
            </Form.Group>
            <Button className="w-100 mt-3" type="submit" onClick={()=>{
              if(isOpen)
                <Popup content={<>
                  <b>Edit Details</b>
                  </>}  handleClose={togglePopup}></Popup>
            }}>
              Reset
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2" >
        <p style={{
         color:"cyan"
       }}>Go Back to Logon <Link to="/login">Log in</Link></p>
      </div>
    </div>
  );
}

export default PasswordReset;
