import React, { useState, useEffect }from "react";
//import { addComment, getAllComments } from './App.js';


function CommentsBox({name, userEmail}) {
  
  const [commentState, setCommentState]=useState([{ email: "", message: "", timestamp: ""}]);
  const [boxInput, setBoxInput]=useState(null);
  const [clicker, setClicker]=useState(false);
  
  function getAllComments(media){
    media = encodeURIComponent(media);
    const url = "/api/v1/comment?media=" + media;
    
    fetch(url, {
      method: 'GET',
        headers: {
          'Content-Type': 'application/json'
         },
       })
     .then(response => {
        return response.json();
      }).then(responseData => {
        // can loop through this list and get .email, .message, .timestamp
        const comments = responseData.comments
        setCommentState(comments)
        console.log(comments)
        console.log(typeof comments)
      });
      
  }
  
  function addComment(email, media, message){
    email = encodeURIComponent(email);
    media = encodeURIComponent(media);
    message = encodeURIComponent(message);
  
    const url = "/api/v1/comment";
    const data = JSON.stringify({'email': email, 'media': media, 'message': message});
  
    fetch(url, {
        method: 'POST',
         headers: {
            'Content-Type': 'application/json'
          },
          body: data
         })
       .then(response => {
          return response.json();
        }).then(responseData => {
          console.log(responseData);
        });
    }
  
  //this works
  //"Great Show"
  //
  
  useEffect(() => {
    getAllComments(name);
    //console.log(commentState);
    //addComment("ibraam2009@gmail.com","Great Show","testing testing")
    }, []);
    
  console.log(name);
  //var commentStateLength = commentState.length;
  
  function getData(val){
    setBoxInput(val.target.value)
    
    console.log(val.target.value)
  }
  
    return(
      <div>
      {/*JSON.stringify(commentState[0]["message"])*/}
      <h1 className="title">Kindly leave your thoughts below</h1>
      
      {
      commentState.map((comment) => (
          <div>{JSON.stringify(comment)}</div>
        ))
      }
      
        <form>
          <div>
            <input type="text" placeholder="Add a comment" onChange={getData}/>
          </div>
          <div>
              {
                clicker?
                addComment("ibraam2009@gmail.com", name , "hi")
                :null
              }
              <button onClick={()=>setClicker(true)}>Submit</button>
          </div>
        </form>
      
      </div>
    )
}

export default CommentsBox