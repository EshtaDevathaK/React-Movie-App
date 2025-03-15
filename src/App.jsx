import {useEffect, useState} from 'react'
import React from 'react'
import Search from "./components/Search.jsx"
import Spinner from "./components/Spinner.jsx"
import MovieCard from './components/MovieCard.jsx';

import { useDebounce } from 'react-use';


const API_BASE_URL = 'https://www.omdbapi.com/';

const API_KEY = import.meta.env.VITE_OMDB_API_KEY;


const App = () => {
const[searchTerm, setSearchTerm] = useState('');
const[errorMessage, setErrorMessage] = useState('');
const [moviesList, setMoviesList] = useState([]); // Store fetched movies
const [isLoading, setIsLoading] = useState(false); // When data is fetche dit take some Time -- users should know that it takes time
const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(''); 

 // Debounce effect using useDebounce
 useDebounce(() => {
  setDebouncedSearchTerm(searchTerm);
}, 2000, [searchTerm]);


const fetchMovies = async (query) =>{

   if (!query){
      setMoviesList([]); // Clear previous movie
      setErrorMessage(""); // Clear error message
      return;
    }
  
  setIsLoading(true);
  setErrorMessage("");

  try {
   

    const endpoint = `${API_BASE_URL}?apikey=${API_KEY}&s=${query}`;
    
    
    const response = await fetch(endpoint);
    const data = await response.json();

    if (data.Response === "False") {
      setErrorMessage(data.Error || `Failed To Fetch Movies sorry MA!!`);
      setMoviesList([]); // Clear previous results if there's an error
      return;
    } 


     // Fetch full movie details for each movie
     const detailedMovies = await Promise.all(
      data.Search.map(async (movie) => {
        const detailsResponse = await fetch(`${API_BASE_URL}?apikey=${API_KEY}&i=${movie.imdbID}`);
        const detailsData = await detailsResponse.json();
        return detailsData; // Full movie details
      })
    );
    setMoviesList(detailedMovies);
    setErrorMessage(""); 
    

    
  } catch (e) {
    console.log(`ERROR IS ----> ${e}`);
    setErrorMessage(`Error fetching movies. Please try again later.`);
  }finally {
    setIsLoading(false); // Ensure loading stops in all cases
  }
}



// Fetch movies when `debouncedSearchTerm` changes
useEffect(() => {
  if (debouncedSearchTerm) {
    fetchMovies(debouncedSearchTerm);
  } else {
    fetchMovies("Disney"); // Default movies
  }
}, [debouncedSearchTerm]);

return (
    <main className='pattern'>
      <div className='wrapper'>
        <header>
          <img src="./NewHero2.png" alt="Hero banner" />
         <h1>Find <span className='text-gradient'>Movies</span> You'll Enjoy Without Hassle</h1>
        
        <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
        </header>

        <section className='all-movies'>
        <h2 className='mt-[40px]'>All Movies</h2>

        {isLoading ? (
         <Spinner/>
        ): errorMessage ?(
          <p className='text-red-500'>{errorMessage}</p>
        ): (
          <ul>
            {moviesList.map((movie) => (
             <MovieCard key={movie.imdbID} movie={movie}/>
            ))}
          </ul>
        )}
      
        </section>
      </div>
    </main>
  )
}

export default App;