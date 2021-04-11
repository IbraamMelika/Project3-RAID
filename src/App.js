import React from 'react';
import './App.css';
import requests from './requests';
import RowRetry from './RowRetry';
import Banner from './Banner';

export function App() {
  let searchTerm = "avenger";

  function searchChangeHandler(event){
    console.log(event.target.value);
    const searchTerm = event.target.value;
    // <requests searchTerm={ searchTerm }/>
    return searchTerm
  }
  
  return (
    <div className="App">
      {/* Nav bar componant */}
      <nav>
        <ul>
          <li><p>RAID</p></li>
          <li><a href='default.asp'>Search!</a></li>
          <input type="text" id="searchValue" placeholder="Search" class="search" onChange={searchChangeHandler}/>
        </ul>
      </nav>
      <Banner/>
      <RowRetry title="Search Results" fetchURL={requests.fetchSearch} isLargeRow/>
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
