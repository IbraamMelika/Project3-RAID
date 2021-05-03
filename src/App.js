/* eslint-disable no-unused-vars */
import React from 'react'
import './App.css'
import requests from './requests'
import RowRetry from './RowRetry'
import Banner from './Banner'
import Logout from './Logout';
import Landing from './Landing';
import FavoritePage from './FavoritePage';
import WatchlistPage from './WatchlistPage';
import ProfilePage from './ProfilePage';
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

function changeDescription(email, description){
  /* willBeFavorite is a boolean value */
  
  email = encodeURIComponent(email);
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
      });
}

changeDescription("ranfis.francisco@gmail.com", "love movies!!!");

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

function getAllFavorites(email){
  email = encodeURIComponent(email);
  const url = "/api/v1/favorite?email=" + email;
  
  fetch(url, {
      method: 'GET',
       headers: {
          'Content-Type': 'application/json'
         },
       })
     .then(response => {
        return response.json();
      }).then(responseData => {
        const favoritesList = responseData.allFavorites
      });
}

export function getAllComments(media){
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
        console.log(comments)
      });
}

export function addComment(email, media, message){
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

function getAllWatchlists(email){
  email = encodeURIComponent(email);
  const url = "/api/v1/watchlist?email=" + email;
  
  fetch(url, {
      method: 'GET',
       headers: {
          'Content-Type': 'application/json'
         },
       })
     .then(response => {
        return response.json();
      }).then(responseData => {
        // can loop through this list and get .listName, .dateCreated
        const watchLists = responseData.watchLists
        console.log(watchLists)
      });
}

function addOrRemoveWatchlist(email, listName, addOrRemove){
  /* addOrRemove is a boolean value True for add False for remove*/
  
  email = encodeURIComponent(email);
  listName = encodeURIComponent(listName);
  
  const url = "/api/v1/watchlist";
  const data = JSON.stringify({'email': email, 'listName': listName, 'addOrRemove': addOrRemove});
  
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

function getAllWatchitemsOnWatchlist(email, listName){
  email = encodeURIComponent(email);
  listName = encodeURIComponent(listName);
  const url = "/api/v1/watchitem?email=" + email + "&listName=" + listName;
  
   fetch(url, {
      method: 'GET',
       headers: {
          'Content-Type': 'application/json'
         },
       })
     .then(response => {
        return response.json();
      }).then(responseData => {
        // can loop through list and get .media, .dateAdded for each
        const watchItems = responseData.watchItems
        console.log(watchItems)
      });
}

function addOrRemoveWatchitemFromWatchlist(email, listName, media, addOrRemove){
  /* addOrRemove is a boolean value True for add False for remove*/
  
  email = encodeURIComponent(email);
  listName = encodeURIComponent(listName);
  media = encodeURIComponent(media);
  
  const url = "/api/v1/watchitem";
  const data = JSON.stringify({'email': email, 'media': media, 'listName': listName, 'addOrRemove': addOrRemove});
  
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

function isWatchitemOnWatchlist(email, listName, media){
  email = encodeURIComponent(email);
  listName = encodeURIComponent(listName);
  media = encodeURIComponent(media);
  
  const url = "/api/v1/watchitem?email=" + email + "&media=" + media + "&listName=" + listName;
  
  fetch(url, {
      method: 'GET',
       headers: {
          'Content-Type': 'application/json'
         }
       })
     .then(response => {
        return response.json();
      }).then(responseData => {
        const isOnWatchlist = responseData.isOnWatchlist;
        console.log("Is On List: " + isOnWatchlist);
      });
}

export function App() {
  const [showAllFavorites, setShowAllFavorites] = useState(false);
  const [showAllwatchLists, setshowAllwatchLists] = useState(false);
  const [searchTerm, setsearchTerm] = useState(" ");
  const [beingSearched, setBeingSearched] = useState(false);
  const [appShown, setShown] = useState(false);
  const [userImage, setUserImage] = useState('');
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [showProfilePage, setShowProfile] = useState(false);
  
  function favoriteClickHandler(){
    setShowAllFavorites(!showAllFavorites);
  }
  
  function watchListClickHandler(){
    setshowAllwatchLists(!showAllwatchLists);
  }
  
  function searchChangeHandler(event){
    const searchValue = event.target.value;
    if (searchValue === "" || searchValue === " " || searchValue === "  " || searchValue === "   " || searchValue === null){
      setsearchTerm(" ");
      setBeingSearched(false);
    }
    else {
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
  
  function showProfile() {
    setShowProfile(true);
  }
  
  // Hide all other page components
  function showOnlyHome() {
    setShowProfile(false);
    setShowAllFavorites(false)
  }
  
  // Grab google user info from login component and push to database
  const grabUserInfo = (data) => { 
    setUserName(data.name);
    setUserImage(data.imageUrl);
    setUserEmail(data.email);
    userLoggedIn(data.email);
    console.log("User email: "+data.email);
  };
  
  return (
    <div>
    {appShown === true ? (
      <div className="App">
          <nav className="grid">
            <ul>
              <li><img src="movielogosmall.jpg" alt="page logo" className="logo" onClick={showOnlyHome}></img></li>
              <li><button onClick={showOnlyHome}>Movie Finder</button></li>
              <li><button onClick={watchListClickHandler}>Watchlist</button></li>
              <li><button onClick={favoriteClickHandler}>Favorites</button></li>
              <li><img src={userImage} alt="google profile pic" className="google-profile-pic"></img></li>
              <li><button onClick={showProfile}>{userName}</button></li>
              <li><Logout hidePage={hidePage}/></li>
            </ul>
          </nav>
          { showAllwatchLists === true ? (<WatchlistPage userEmail={userEmail}/>)
          : null}
          { showAllFavorites === true ? (<FavoritePage userEmail={userEmail}/>)
          : null}
          { showProfilePage === true ? (<ProfilePage userImage={userImage} userName={userName} userEmail={userEmail}/>)
          : ( 
            <div>
              <div className="search-div">
                <input type="text" id="searchValue" placeholder="Search Movie..." className="searchbar" onChange={searchChangeHandler}/>
              </div>
              <Banner/>
              { beingSearched === true ? 
              (<RowRetry title="Search Results" 
              fetchURL={"/search/multi?api_key="+API_KEY+"&language=en-US&query="+searchTerm+"&page=1&include_adult=false"}
              isLargeRow userEmail={userEmail}/>)
              : null}
              <RowRetry title="NETFLIX ORIGINALS" fetchURL={requests.fetchNetlfixOriginals} userEmail={userEmail} isLargeRow/>
              <RowRetry title="Trending Now" fetchURL={requests.fetchTrending} userEmail={userEmail}/>
              <RowRetry title="Top Rated" fetchURL={requests.fetchTopRated} userEmail={userEmail}/>
              <RowRetry title="Action Movies" fetchURL={requests.fetchActionMovies} userEmail={userEmail}/>
              <RowRetry title="Comedy Movies" fetchURL={requests.fetchComedyMovies} userEmail={userEmail}/>
              <RowRetry title="Horror Movies" fetchURL={requests.fetchHorrorMovies} userEmail={userEmail}/>
              <RowRetry title="Documentaries" fetchURL={requests.fetchDocumentaries} userEmail={userEmail}/>
            </div> )}
      </div>
    ) : (
          <div>
            <Landing showPage={showPage} grabUserInfo={grabUserInfo}/>
          </div>
        )}      
 </div>
  );
}

export default App;
