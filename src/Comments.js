import React from "react";
import { addComment, getAllComments } from './App.js';


function Comments({name, userEmail}) {
    addComment(userEmail,name,"test message")
    getAllComments(name)
    console.log(typeof getAllComments(name))
    
    return(
        <div>
        h
        </div>
    )
}

export default Comments