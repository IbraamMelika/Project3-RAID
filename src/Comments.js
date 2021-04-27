import React from "react";
import { addComment, getAllComments } from './App.js';


function Comments({name, userEmail}) {
    
    name = encodeURIComponent(name);
    userEmail = encodeURIComponent(userEmail);
    
    //const url = "/api/v1/comment?media=" + media;
    
    /*
    addComment(userEmail,name,"test message")
    getAllComments(name)
    console.log(typeof getAllComments(name))
    console.log(getAllComments(name))
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

export default Comments