import React from 'react';
import Login from './Login';

function Landing(prop) {
  
  return (
    <div className ="landing-page">
      <nav className="land-grid">
            <ul>
              <li><img src="movielogosmall.jpg" alt="page logo" className="logo"></img><a href='default.asp'>  Movie Finder</a></li>
            </ul>
      </nav>
      <br></br>
      <div className="landing-container1">
          <br></br>
          <div class="landing-top-text">
              <br></br>
              <br></br>
              <h1>Let's Find a Movie!</h1>
              <br></br>
              <p>Easily search through the major streaming services and find a movie or show worth watching.</p>
              <br></br>
              <p>Browse our catalog of trending movies and shows.</p>
              <br></br>
              <p>Watch trailers with one click.</p>
              <br></br>
              <p>Just Sign In To Begin</p>
              <Login showPage={prop.showPage} grabUserInfo={prop.grabUserInfo}/>
          </div>
          <img src="servicebkg1.png" alt="background" className="landing-background1"></img>
      </div>
      <div className="landing-container2">
      <br></br>
        <div class="landing-bot-text">
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <h1>Share your thoughts with the community</h1>
          <br></br>
          <p>Post comments and let others know what you thought about the movie.</p>
          <br></br>
          <p>Add and share your favorites or create your own watchlist.</p>
        </div>
        <img src="landbkg2.png" alt="background" className="landing-background2"></img>
      </div>
    </div>
  );
}

export default Landing;

