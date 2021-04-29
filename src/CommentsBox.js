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
  //"Stowaway"
  
  useEffect(() => {
    getAllComments("Stowaway");
    console.log(commentState);
    }, []);
  

  
    
    return(
        <div>
        <h1 className="title">Kindly leave your thoughts below</h1>
        <form onSubmit={"add the addComment function here"}>
          <div className="field">
            <div className="control">
              <input type="text" className="input" name="name" placeholder="Your name"/>
            </div>
          </div>
          <div className="field">
            <div className="control">
              <textarea className="textarea" name="comment" placeholder="Add a comment"></textarea>
            </div>
          </div>
          <div className="field">
            <div className="control">
              <button className="button is-primary">Submit</button>
            </div>
          </div>
        </form>
      </div>
    )
}

export default CommentsBox