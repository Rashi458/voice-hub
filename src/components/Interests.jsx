import React, { useEffect, useState } from "react";
import { Button, Card, Container } from "react-bootstrap";
import logo from '../logo.png'
import { auth, db } from "../firebase";
import _ from "lodash";
import MyToast from "./common/MyToast";
import { fetchGenreList } from "../utils/genreutils";
import {createUser} from "../utils/userUtils"
function Interests(props) {
  const handleName=props.handle;
  const user = auth.currentUser;
  const variants = [
    "primary",
    "secondary",
    "success",
    "warning",
    "danger",
    "info",
    "light",
  ];
  const { userInterests } = props;
  const [genreList, setGenreList] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState(["AMSR"]);
  const selectedItems = [];

  useEffect(() => {
    fetchGenreList( [], setGenreList);
  }, []);

  //console.log("GenreList", genreList[0], genreList.length);
  //handle submit
  const handleSubmit = () => {
    for (let genre of genreList) {
      const attr = document.getElementById(genre.id).getAttribute("class");
      if (attr.endsWith("active")) {
        selectedItems.push(genre.value);
      }
    }
    createUser(handleName,selectedItems);
    console.log(selectedItems);
    
  };
const handleProceed=()=>{
window.open('/feeds?image='+auth.currentUser.photoURL,"_self")
}
  //handle
  const handleInterestClick = (genre) => {
    let temp = [...selectedGenres];

    if (temp.includes(genre.value)) {
      temp = _.remove(temp, (value) => value !== genre.value);
      //console.log("removed", temp);
    } else temp.push(genre.value);
    //console.log(temp);
    setSelectedGenres(temp);
    
  };

  const active = (genre) => {
    if (selectedGenres.includes(genre.value)) return " active";
    return "";
  };

  return (
    <div className="container w-50 mt-0 " style={{
      width:100+ "vw",
      height:100+"vh",
    }}>
     
      <Card bg="dark" style={{
        color:"cyan",
      }}>
        <Card.Body>
          <span>Choose Your Interests</span>
          <img src=""></img>

          <Container fluid>
            {genreList.map((genre) => (
              <button
                key={genre.id}
                id={genre.id}
                onClick={() => handleInterestClick(genre)}
                class={
                  "m-2 btn btn-outline-" +
                  variants[_.random(0, variants.length - 1)] +
                  active(genre)
                }
              >
                {genre.value}
              </button>
            ))}
            <MyToast></MyToast>
          </Container>
          <div className="align-middle">
        <Button onClick={handleSubmit}>save</Button>
        
      </div>
        </Card.Body>
        
        
      </Card>
      <Button onClick={handleProceed}>proceed,{handleName}</Button>
    </div>
  );
}

export default Interests;
