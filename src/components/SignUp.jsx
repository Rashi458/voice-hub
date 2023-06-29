import React, { useEffect, useRef, useState } from "react";
import { auth } from "../firebase";
import { Card, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from '../logo.png'
function SignUp(props) {
  const emailRef = useRef();
  const passwordRef = useRef();
  const password2Ref = useRef();
  const nameRef=useRef();
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) props.history.replace("/userhandle");
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const password2 = password2Ref.current.value;
    const name=nameRef.current.value;
    if (password !== password2) {
      console.log("Typed Passwords Doesnot Match");
      return;
    }

    auth
      .createUserWithEmailAndPassword(email, password,name)
      .then((user) => {
        console.log(user);
      })
      .catch((e) => {
        console.log("SignUp Failed", e);
      });
  };

  return (
    <div className="container mt-0 w-50" style={{
      width:100+ "vw",
      height:100+"vh",
    }}>
      <img src={logo}></img>
      <Card bg="dark" style={{
        color:"cyan",
      }}>
        <Card.Body>
          <h2 className="text-center mb-4">Sign Up</h2>
          <Form onSubmit={handleSubmit}>
          <Form.Group id="name">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" ref={nameRef} required style={{
                backgroundColor:"transparent",
                borderColor:"cyan"
              }}/>
            </Form.Group>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required style={{
                backgroundColor:"transparent",
                borderColor:"cyan"
              }}/>
            </Form.Group>
            <Form.Group id="password">
              <Form.Label className="mt-2">Password</Form.Label>
              <Form.Control type="password" ref={passwordRef} required style={{
                backgroundColor:"transparent",
                borderColor:"cyan"
              }} />
            </Form.Group>
            <Form.Group id="password2">
              <Form.Label className="mt-2">Retype Password</Form.Label>
              <Form.Control type="password" ref={password2Ref} placeholder="abc@example.com" required style={{
                backgroundColor:"transparent",
                borderColor:"cyan"
              }}/>
            </Form.Group>
            <Button className="w-100 mt-3" type="submit">
              Sign Up
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
       <p style={{
         color:"cyan"
       }}> Already Have a account? <Link to="/login">Log in</Link></p>
      </div>
    </div>
  );
}

export default SignUp;
