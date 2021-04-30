import React, { useState, useEffect }from "react";
//import { addComment, getAllComments } from './App.js';


function CommentsBox({name, userEmail}) {
  
  const [commentState, setCommentState]=useState([{ email: "", message: "", timestamp: ""}]);
  
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
    getAllComments("Great Show");
    //console.log(commentState);
    }, []);
    
  console.log(commentState);
  
  var commentStateLength = commentState.length;
  {}
    
    return(
      <div>
      {JSON.stringify(commentState[0]["message"])}
      
      
      
      </div>
    )
}

export default CommentsBox