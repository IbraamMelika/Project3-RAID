import React from 'react'
import { useState, useRef, useEffect } from 'react';
import './App.css';
import requests from "./requests"

import RowRetry from './RowRetry'
import Banner from './Banner'

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
  //willBeFavorite is a boolean value
  
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

function App() {
    useEffect(() => {
      userLoggedIn('test@network.com');
      getUserInfoByEmail('test@network.com');
      isFavorite('test@network.com', '123');
      changeFavorite('test@network.com', '123', true);
      isFavorite('test@network.com', '123');
    }, []);
  
  return (
    <div className="App">
      {/* Nav bar componant */}
      <Banner/>
      <RowRetry title="NETFLIX ORIGINALS" fetchURL={requests.fetchNetlfixOriginals} isLargeRow/>
      <RowRetry title="Trending Now" fetchURL={requests.fetchTrending}/>
      <RowRetry title="Top Rated" fetchURL={requests.fetchTopRated}/>
      <RowRetry title="Action Movies" fetchURL={requests.fetchActionMovies}/>
      <RowRetry title="Comedy Movies" fetchURL={requests.fetchComedyMovies}/>
      <RowRetry title="Horror Movies" fetchURL={requests.fetchHorrorMovies}/>
      <RowRetry title="Documentaries" fetchURL={requests.fetchDocumentaries}/>
    </div>
  );
}

export default App;
