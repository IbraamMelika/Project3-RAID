import React from 'react'
import { useState, useRef, useEffect } from 'react';
import './App.css';
import requests from "./requests"

import RowRetry from './RowRetry'
import Banner from './Banner'

require('isomorphic-fetch');

function userLoggedIn(email){
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
        console.log(responseData.newUser)
      });
}

function App() {
    useEffect(() => {
      userLoggedIn('test@network.com');
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
