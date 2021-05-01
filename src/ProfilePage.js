import React from 'react';
import { useState, useRef } from 'react';
import FavoritePage from './FavoritePage';

function ProfilePage(prop) {
  const [descText, setDesc] = useState("");
  const inputRef = useRef(null);
  
  function submitClick() {
    setDesc(inputRef.current.value);
  }
  
  return (
    <div>
        <div className="profile-container">
            <div></div>
            <div class="box"><img src={prop.userImage} alt="google profile pic" className="profile-pic"></img></div>
            <div class="box" className="desc-div">
              <br></br>
              <h1>{prop.userName}</h1><br></br>
              { descText === "" ? (
                <div>
                  <textarea ref={inputRef} name="descText" cols="40" rows="5" placeholder="Enter profile description..."></textarea>
                  <br></br>
                  <button type="button" className="submit_button" onClick={submitClick}>Submit</button>
                </div>
                ) 
              : ( 
                <div>
                  <p>{descText}</p>
                </div>
              )}
            </div>
            <div></div>
            <div></div>
            <div class="box" className="list-div">
              <h1><u>Your Favorites</u></h1>
              <br></br>
              <FavoritePage userEmail={prop.userEmail}/>
            </div>
            <div class="box" className="list-div">
              <h1><u>Your Watchlist</u></h1>
            </div>
            <div></div>
        </div>
    </div>
  );
}

export default ProfilePage;