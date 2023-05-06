import React, { useState } from 'react';
import axios from 'axios';
import './MovieSearch.css';

function MovieSearch() {
  const [query, setQuery] = useState('');
  const [myresults, setResults] = useState([]);

  const handleChange = event => {
    setQuery(event.target.value);
    searchMovies(event.target.value);
  };

  const searchMovies = async query => {
    try {
      const response = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=1477d1a17499d855501aa24f42a4f2e4&query=${query}`);
      setResults(response.data.results);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="movie-search-container">
      <h1 className="movie-search-header">Movie Search</h1>
      <input type="text" placeholder="Search for a movie" value={query} onChange={handleChange} className="movie-search-input" />
      <ul className="movie-search-results">
        {myresults.map(result => (
          <li key={result.id} className="movie-search-result">
            <img src={`https://image.tmdb.org/t/p/w500/${result.poster_path}`} alt={result.title} className="movie-search-result-poster" />
            <div className="movie-search-result-details">
              <h2 className="movie-search-result-title">{result.title}</h2>
              <p className="movie-search-result-year">{result.release_date}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MovieSearch;
