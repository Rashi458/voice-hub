import React, { useEffect, useState, useRef } from "react";
import firebase from "firebase";
import auth,{ db } from "../firebase";
import { Card, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import MyToast from "./common/MyToast";
import logo from '../logo.png'
function LoginForm(props) {
  const emailRef = useRef();
  const passwordRef = useRef();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      console.log("ASC", user);
      if (user) {
        if(user.metadata.b-user.metadata.a>=50)
          props.history.push('/feeds')
        else
          props.history.push('/userhandle')
      }
    });
    return unsubscribe;
  }, []);

  //on submit

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    console.log(email, password);
    auth
      .signInWithEmailAndPassword(email, password)
      .then((user) => {
        console.log(user);
      })
      .catch((e) => {
        console.error(e.message, e.code.split("/")[1].toUpperCase());
        <MyToast message={e.message} title={e.code.split("/")[1]}></MyToast>;
      });
  };

  //google login
  const handleGoogleLogin = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider).catch((e) => {
      console.error(e);
    });
   
  };

  //facebook login
  const handleFacebookLogin = () => {
    const provider = new firebase.auth.FacebookAuthProvider();
    auth.signInWithPopup(provider).catch((e) => {
      console.error(e);
    });

  };

  return (
    <div className=" container mt-0 w-50" style={{
      width:100+ "vw",
      height:100+"vh",
    }}>
      <img src={logo}></img>
      <Card bg="dark" style={{
        color:"cyan",
      }}>
        <Card.Body>
          <h2 className="text-center mb-4">Log In</h2>
          <Form onSubmit={handleOnSubmit}>
            <Form.Group id="email">
              <Form.Label >Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required style={{
                backgroundColor:"transparent",
                borderColor:"cyan"
              }} />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label className="mt-2">Password</Form.Label>
              <Form.Control type="password" ref={passwordRef} required style={{
                backgroundColor:"transparent",
                borderColor:"cyan"
                
              }} />
            </Form.Group>
            <Button className="w-100 mt-3" type="submit">
              Log In
            </Button>
            <Button
              className="w-100 mt-3 btn-danger"
              onClick={handleGoogleLogin}
            >
              GOOGLE
            </Button>
            <Button className=" w-100 mt-3" onClick={handleFacebookLogin}>
              FACEBOOK
            </Button>
          </Form>
          <div className="w-100 text-center mt-3">
            <Link to="/resetpassword">Forgot Password?</Link>
          </div>
        </Card.Body>
      </Card>
      <div class="aao" className="w-100 text-center mt-2">
        <p>Need an account? <Link to="/signup">Sign Up</Link></p>
      </div>
    </div>
  );
}

export default LoginForm;
