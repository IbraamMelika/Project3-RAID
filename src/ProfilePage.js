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

          const descriptionData = responseData.description;
          setDesc(descriptionData);
        });
  }
  
  function changeDescription(email, description){
  /* willBeFavorite is a boolean value */
  
  email = encodeURIComponent(email);
  const origDesc = description;
  description = encodeURIComponent(description);
  
  const url = "/api/v1/person";
  const data = JSON.stringify({'email': email, 'description': description});
  
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
        setDesc(origDesc);
      });
}
  function submitClick() {
    const userInput = inputRef.current.value;
    changeDescription(prop.userEmail, userInput);
  }
  
  useEffect(() => {
    getUserInfoByEmail(prop.userEmail);
  }, []);
  
  function clearDesc() {
    setDesc(null);
  }
  
  return (
    <div>
        <div className="profile-container">
            <div></div>
            <div class="box"><img src={prop.userImage} alt="google profile pic" className="profile-pic"></img></div>
            <div class="box" className="desc-div">
              <br></br>
              <h1>{prop.userName}</h1>
              <h5>User since {joinDate}</h5><br></br>
              { descText === null ? (
                <div>
                  <textarea ref={inputRef} name="descText" cols="40" rows="5" placeholder="Enter profile description..."></textarea>
                  <br></br>
                  <button type="button" className="submit_button" onClick={submitClick}>Submit</button>
                </div>
                ) 
              : ( 
                <div>
                  <p>{descText}</p>
                  <span className="edit-desc" onClick={clearDesc}>Edit Description</span>
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