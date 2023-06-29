import { Button } from "bootstrap";
import React, { useEffect, useRef, useState } from "react";
import { Card } from "react-bootstrap";
import { addPost } from "../utils/postutils";
import logo from '../logo.png'
import Post from './post'
import auth from "../firebase";
function AddPost(props) {
  const [captured, setCaptured] = useState(false);
  const [recording, setRecording] = useState(false);
  const [url, setUrl] = useState("");
  const descRef = useRef();
  window.userDoc=auth.currentUser
  console.log(window.userDoc)
  const allGenre = [
    "Story Telling",
    "AMSR",
    "White Noise",
    "Pink Noise",
    "Horror",
  ];

  let mediaRecorder="" ;

  const handleAudioCapture = (e) => {
    const file = e.target.files[0];
    const localUrl = URL.createObjectURL(file);
    setCaptured(true);
    setUrl(localUrl);
  };
  let handleDiscardRecording = undefined;
  let handleSaveRecording = undefined;

  const fetchPostGenreList = () => {
    const list = [];

    for (let i = 0; i < allGenre.length; i++) {
      const el = document.getElementById(i);
      if (el.checked) list.push(el.getAttribute("value"));
    }
    console.log(list);
    return list;
  };

  const handleAddPost = (e) => {
    auth.onAuthStateChanged(function(user) {
      if (user) {
        e.preventDefault();
        console.log(e.target);
    
        const desc = descRef.current.value;
        const handle = props.handle && "some random handle";
        const genreList = fetchPostGenreList();
        addPost(url, desc, genreList, handle,auth.currentUser.photoURL);
      } else {
        e.preventDefault();
        console.log(e.target);
    
        const desc = descRef.current.value;
        const handle = props.handle && "some random handle";
        const genreList = fetchPostGenreList();
        addPost(url, desc, genreList, handle);
      }
    });
   
  };
  const handleRecord = () => {
    console.log("mic clicked", recording);
    if (!recording) {
      navigator.mediaDevices
        .getUserMedia({ audio: true })
        .then((stream) => {
          const mediaRecorder = new MediaRecorder(stream);
          window.mediaRecorder = mediaRecorder;

          const chunks = [];
          mediaRecorder.ondataavailable = (e) => {
            console.log("data avail,...", e);
            chunks.push(e.data);
          };

          mediaRecorder.onstop = (e) => {
            const blob = new Blob(chunks);

            const file = new File(chunks, "recorded.wav");
            window.file = file;

            const localUrl = URL.createObjectURL(new Blob(chunks));
            setUrl(localUrl);

            setRecording(false);
            console.log("REcording stoped", localUrl);
            stream.getTracks().forEach(function (track) {
              track.stop();
            });
          };
          mediaRecorder.start();
          setRecording(true);
          console.log("====================================");
          console.log("recording");
          console.log("====================================");
        })
        .catch((e) => console.log("Recording permission denied", e));
    } else {
      //console.log(mediaRecorder);
      window.mediaRecorder.stop();
    }
  }
  return (
    <div className="container mt-5 " style={{
      height:"auto"
    }}>
      <Card  style={{
        color:"cyan",
        borderRadius:20+"px",
        backgroundColor:"transparent",
        borderColor:"cyan",
        boxSizing:"border-box",
        padding:"10px 10px"
      }}>
        <div className="input-group mb-3 ">
          <input
            type="text"
            className="form-control"
            aria-label="Text input with dropdown button"
            ref={descRef}
            placeholder="Add Some Description"
            style={{
              borderRadius:"20px",
              borderColor:"cyan",
              backgroundColor:"transparent",
              color:"cyan"
            }}
          />
          <button
            className="btn btn-outline-secondary dropdown-toggle"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
            style={{
              borderRadius:"20px",
              color:"cyan"
            }}
          >
            Select Post Genre
          </button>
          <ul className="dropdown-menu dropdown-menu-end" style={{
            backgroundColor:"black",
            color:"cyan",
            width:"fit-content"
          }}>
            {allGenre.map((genre, i) => {
              return (
                <li>
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value={genre}
                    id={i}
                    style={{
                      marginLeft:"5px",
                      color:"cyan"
                    }}
                  />
                  <label className="form-check-label" for="flexCheckDefault" style={{
                    marginLeft:"5px"
                  }}>
                    {genre}
                  </label>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="fliud">
          <input
            type="file"
            id="audio"
            name="audio"
            accept="audio/*"
            onChange={handleAudioCapture}
            style={{
              borderRadius:"10px",
              paddingRight:"10px"
            }}
          />
          <audio id="player" controls src={url} style={{
            backgroundColor:"transparent"
          }}></audio>
        </div>
        <div onClick={handleRecord}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
          >
            <path
              fill="green"
              d="M11.999 14.942c2.001 0 3.531-1.53 3.531-3.531V4.35c0-2.001-1.53-3.531-3.531-3.531S8.469 2.35 8.469 4.35v7.061c0 2.001 1.53 3.531 3.53 3.531zm6.238-3.53c0 3.531-2.942 6.002-6.237 6.002s-6.237-2.471-6.237-6.002H3.761c0 4.001 3.178 7.297 7.061 7.885v3.884h2.354v-3.884c3.884-.588 7.061-3.884 7.061-7.885h-2z"
            ></path>
          </svg>
        </div>
        <div style={{ 
          display: (recording ? "flex" : "none") ,
          justifyContent:"center"
          }}>
          <button
            className="btn btn-outline-success"
            onClick={handleDiscardRecording}
            style={{
              width:"fit-content",
              marginRight:"10px"
            }}
          >
            Discard
          </button>
          <p>duration</p>
          <button
            className="btn btn-outline-success"
            onClick={handleSaveRecording}
            
            style={{
              width:"fit-content",
              marginLeft:"10px"
            }}
          >
            Save
          </button>
        </div>
            <div styles={{
              display:"flex",
              justifyContent:"center",
              paddingTop:"10px"
            }}>
        <button className="btn  btn-outline-success" onClick={handleAddPost} style={{
          justifyContent:"center"
        }}>
          Add Post
        </button>
        </div>
      </Card>
      <br></br>
      
    </div>
    
  );
}

export default AddPost;
