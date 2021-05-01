import React from 'react';
import { useState, useRef, useEffect } from 'react';
import FavoritePage from './FavoritePage';

function ProfilePage(prop) {
  const [joinDate, setJoinDate] = useState("");
  const [descText, setDesc] = useState("");
  const inputRef = useRef(null);
  
  function getUserInfoByEmail(email){
    email = encodeURIComponent(email);
    const url = "/api/v1/person?email=" + email;
    
    fetch(url, {
        method: 'GET',
         headers: {
            'Content-Type': 'application/json'
           },
         })
       .then(response => {
          return response.json();
        }).then(responseData => {
          const joinData = responseData.joinDate;
          const split1 = joinData.split(', ');
          const split2 = split1[1].split(' ');
          const joinDate = split2[1]+" "+split2[0]+' '+split2[2];
          setJoinDate(joinDate);
        });
  }

  function submitClick() {
    setDesc(inputRef.current.value);
  }
  
      useEffect(() => {
        getUserInfoByEmail(prop.userEmail);
    }, []);
  
  return (
    <div>
        <div className="profile-container">
            <div></div>
            <div class="box"><img src={prop.userImage} alt="google profile pic" className="profile-pic"></img></div>
            <div class="box" className="desc-div">
              <br></br>
              <h1>{prop.userName}</h1>
              <p>User since {joinDate}</p><br></br>
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