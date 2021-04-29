import React, { useState }from "react";
//import { addComment, getAllComments } from './App.js';


function CommentsBox({name, userEmail}) {
  
  const [commentState, setCommentState]=useState([]);
  
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
      });
  }
  
  //this works
  //"Stowaway"
  //getAllComments("Stowaway");
  //console.log(typeof commentState);
  

    /*
    name = encodeURIComponent(name);
    userEmail = encodeURIComponent(userEmail);
    
    //const url = "/api/v1/comment?media=" + media;
    
    
    addComment(userEmail,name,"test message")
    getAllComments(name)
    //console.log(typeof getAllComments(name))
    //console.log(getAllComments(name))
    */
    
    return(
        <div>
        <h1 className="title">Comments Section</h1>
        
        <form onSubmit="function-goes-here-to-submit">
          
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