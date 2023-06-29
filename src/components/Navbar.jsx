import React from "react";
import { Link } from "react-router-dom";
import "../resources/user.png";
import logo from '../logo.png'
import Notification from './notification'
import auth from "../firebase";
function Navbar(props) {
  return (
    <nav class="navbar navbar-expand-lg ">
      <div class="container-fluid">
        <a class="navbarbrand" href="/profile" >
          <img
            src={logo}
            alt=""
            width="100"
            position="fixed"
            height="fir-content"
            objectFit="cover"
            class="d-inline-block "
            backgroundColor="transparent"
          />
          
        </a>
      </div>
      <form class="d-flex">
        <input
          className="form-control me-2"
          type="search"
          placeholder="@sal_vat_ion"
          aria-label="Search"
        />
        <button class="btn btn-outline-success" type="submit">
          Search
        </button>
      </form>
      <div
        style={{
          display:"flex",
          marginLeft: "5px",
          marginRight: "5px",
        }}
      >
     
        <img
          src={auth.currentUser?auth.currentUser.photoURL:"https://static3.bigstockphoto.com/9/1/3/large1500/31903202.jpg"}
          style={{
            width: "35px",
            height: "35px",
            position: "",
            overflow: "hidden",
            borderRadius: "50%",
          }}
          className="flex"
        ></img>
      </div>
    </nav>
  );
}

export default Navbar;
