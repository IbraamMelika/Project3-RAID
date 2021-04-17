/* eslint-disable no-unused-vars */
import React from 'react'
import './App.css'
import requests from './requests'
import RowRetry from './RowRetry'
import Banner from './Banner'
import Login from './Login';
import Logout from './Logout';
import { useState, useRef, useEffect } from 'react';

const API_KEY =`${process.env.REACT_APP_API_KEY}`;

require('isomorphic-fetch');

function userLoggedIn(email){
    email = encodeURIComponent(email);
    const data = JSON.stringify({'email': email})
    
    fetch("/api/v1/person", {
         method: 'POST',
       headers: {
          'Content-Type': 'application/json'
         },
         body: data,
       })
     .then(response => {
        return response.json();
      }).then(responseData => {
        const success = responseData.success;
        const isNewUser = responseData.newUser;
      });
}

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
        const returnedEmail = responseData.email;
        const username = responseData.username;
        const joinDate = responseData.joinDate;
      });
}

function isFavorite(email, media){
  email = encodeURIComponent(email);
  media = encodeURIComponent(media);
  
  const url = "/api/v1/favorite?email=" + email + "&media=" + media;
  
  fetch(url, {
      method: 'GET',
       headers: {
          'Content-Type': 'application/json'
         }
       })
     .then(response => {
        return response.json();
      }).then(responseData => {
        const isFavorite = responseData.isFavorite;
        console.log("Is Favorite: " + isFavorite);
      });
}

function changeFavorite(email, media, willBeFavorite){
  /* willBeFavorite is a boolean value */
  
  email = encodeURIComponent(email);
  media = encodeURIComponent(media);
  
  const url = "/api/v1/favorite";
  const data = JSON.stringify({'email': email, 'media': media, 'willBeFavorite': willBeFavorite});
  
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

export function App() {
  const [searchTerm, setsearchTerm] = useState(" ");
  const [beingSearched, setBeingSearched] = useState(false);
  const [appShown, setShown] = useState(false);
  const [userImage, setUserImage] = useState('');
  const [userName, setUserName] = useState('');
  
  function searchChangeHandler(event){
    const searchValue = event.target.value;
    if (searchValue === "" || searchValue === " " || searchValue === "  " || searchValue === "   " || searchValue === null){
      setsearchTerm(" ");
      setBeingSearched(false);
    }
    else{
      console.log(searchValue);
      setsearchTerm(searchValue);
      setBeingSearched(true);
    }
  }
  
  function showPage() {
    setShown(true);
  }
  
  function hidePage() {
    setShown(false);
  }
  
  // Grab google user info from login component
  const grabUserInfo = (data) => { 
    setUserName(data.name);
    setUserImage(data.imageUrl);
    console.log("User email: "+data.email);
  };
  
  return (
    <div>
    {appShown === true ? (
      <div className="App">
      
        <h1 style={{color:'red'}}>HELLO TESTING USER STUFF: {userImage}</h1>
        
        <Logout hidePage={hidePage}/> 
        
          <div class="topNav">
            <ul>
              <li><p>RAID</p></li>
              <li><a href='default.asp'>Search!</a></li>
              <input type="text" id="searchValue" placeholder="Search" class="search" onChange={searchChangeHandler}/>
            </ul>
          </div>
          
          <Banner/>
          { beingSearched === true ? 
          (<RowRetry title="Search Results" 
          fetchURL={"/search/multi?api_key="+API_KEY+"&language=en-US&query="+searchTerm+"&page=1&include_adult=false"}
          isLargeRow/>)
          : null}
          <RowRetry title="NETFLIX ORIGINALS" fetchURL={requests.fetchNetlfixOriginals} isLargeRow/>
          <RowRetry title="Trending Now" fetchURL={requests.fetchTrending}/>
          <RowRetry title="Top Rated" fetchURL={requests.fetchTopRated}/>
          <RowRetry title="Action Movies" fetchURL={requests.fetchActionMovies}/>
          <RowRetry title="Comedy Movies" fetchURL={requests.fetchComedyMovies}/>
          <RowRetry title="Horror Movies" fetchURL={requests.fetchHorrorMovies}/>
          <RowRetry title="Documentaries" fetchURL={requests.fetchDocumentaries}/>
      </div>
    ) : (
          <div>
            <Login showPage={showPage} sendUserInfo={grabUserInfo}/>
          </div>
        )}      
 </div>
  );
}

export default App;
