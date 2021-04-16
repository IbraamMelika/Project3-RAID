import React from 'react'
import './App.css'
import requests from './requests'
import RowRetry from './RowRetry'
import Banner from './Banner'
import { useState } from 'react'
const API_KEY =`${process.env.REACT_APP_API_KEY}`;

export function App() {
  const [searchTerm, setsearchTerm] = useState(" ");
  const [beingSearched, setBeingSearched] = useState(false);

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
  
  return (
    <div className="App">
      <nav>
        <ul>
          <li><p>RAID</p></li>
          <li><a href='default.asp'>Search!</a></li>
          <input type="text" id="searchValue" placeholder="Search" class="search" onChange={searchChangeHandler}/>
        </ul>
      </nav>
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
  );
}

export default App;
