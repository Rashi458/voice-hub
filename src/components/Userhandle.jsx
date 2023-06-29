import React, { setState,useRef, useState } from "react";

import auth, { db } from "../firebase";
import logo from '../logo.png'
import { Card, Button, Form } from "react-bootstrap";
import Interests from "./Interests";
import { checkHandleAvailability } from "../utils/userUtils";

function Userhandle(props) {
  const [availability, setAvailability] = useState(false);
  const [disable,setDisable]=useState(true);
  const [handle,setHandle]=useState(undefined);
  const handleRef = useRef();
  const url = auth.currentUser?auth.currentUser.photoURL:"https://static3.bigstockphoto.com/9/1/3/large1500/31903202.jpg";
  const checkAvailability = (e) => {
    console.log(e.target.value);
  };
  const handleChange=(e)=>{
    e.target.style.color="cyan"
    if(e.target.value.trim()==""){
      e.target.style.backgroundColor="white"
     setDisable(true)
    }
    else{
        db.collection("user").where("handle","==",e.target.value.trim())
      .get().then(querySnapshot => {
        if(querySnapshot.empty){
          setDisable(false)
          setHandle(e.target.value.trim())
          e.target.style.backgroundColor="rgb(0, 255, 0,0.4)"
        }
        else{  
          setDisable(true)
        e.target.style.backgroundColor="rgb(255, 0,0,0.4)"
        }
      });
    }
  }
  return (
    <div>
      <div class="w-50 container mt-5" style={{
      width:100+ "vw",
      height:100+"vh",
    }}>
        <img src={logo}></img>
      <Card bg="dark" style={{
        color:"cyan",
      }}>
          <Card.Body>
            <img src={url} style={{ borderRadius: "50%", width: "100px" }} />
            <Form onSubmit={checkAvailability}>
              <Form.Group>
                <div class="col-md-4 mb-3 d-inline">
                  <label for="validationCustomUsername">Username</label>
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <span className="input-group-text" id="inputGroupPrepend">
                        @
                      </span>
                    </div>
                    <input
                      type="text"
                      className="form-control"
                      id="validationCustomUsername"
                      placeholder="Username"
                      aria-describedby="inputGroupPrepend"
                      onChange={handleChange}
                      required
                    />
                    <div className="invalid-feedback">
                      Please choose a username.
                    </div>
                  </div>
                </div>
              </Form.Group>
              <Button id="btn" className="w-100 mt-3" type="submit" href="#interest" disabled={disable} >
                Let's get started
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </div>
      <div style={{ marginTop: "400px" }} id="interest">
        { 
          <Interests handle={handle} ></Interests>
        }
        </div>
    </div>
  );
}

export default Userhandle;
