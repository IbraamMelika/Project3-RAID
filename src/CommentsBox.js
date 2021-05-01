import React, { useState, useEffect }from "react";

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
  
  useEffect(() => {
    getAllComments(name);
    }, [name]);
    
  //console.log(boxInput);
  
  function getData(val){
    setBoxInput(val.target.value)
    console.log(val.target.value)
  }
  
  
    return(
      <div>
      <h1 className="title">Comments Section:</h1>
      
      {
      commentState.map((comment) => (
          
          <div>{
              JSON.stringify(comment["email"]).slice(1,-11) + ": " +
              JSON.stringify(comment["message"]).slice(1,-1) + " : " +
              JSON.stringify(comment["timestamp"]).slice(1,-1)
              }
          </div>
        ))
      }
        <form>
          <div>
            <input type="text" placeholder="Add a comment" onChange={getData}/>
          </div>
          <div>
              {
                clicker?
                addComment(userEmail, name, boxInput)
                :null
              }
              <button onClick={()=>setClicker(true)}>Send</button>
          </div>
        </form>
      
      </div>
    )
}

export default CommentsBox