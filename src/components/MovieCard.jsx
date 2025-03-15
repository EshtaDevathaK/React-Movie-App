import React from 'react';

const MovieCard = ({ movie }) => {
  const { Title, Ratings, Poster, Year, Language } = movie;

  const fallbackPoster = "https://via.placeholder.com/300x450?text=No+Image";

  // Extract IMDb rating if available
  const imdbRating = Ratings && Array.isArray(Ratings)
    ? Ratings.find(r => r.Source === "Internet Movie Database")?.Value || "N/A"
    : "N/A";

  // Extract first available language
  const primaryLanguage = Language ? Language.split(",")[0].trim() : "N/A";

  return (
    <div className='movie-card p-4 bg-gray-800 rounded-lg text-white'>
      {/* Movie Poster */}
      <img 
        src={!Poster || Poster === "N/A" ? fallbackPoster : Poster} 
        alt={Title} 
        className="w-full h-[450px] object-cover rounded-lg"
      />

      {/* Movie Details */}
      <div className='mt-4'>
        <h3 className="text-lg font-bold">{Title}</h3>
        <div className='content flex items-center text-gray-400'>
          {/* Rating */}
          <div className='rating flex items-center'>
            <img src="/star.svg" alt="Star icon" className="w-5 h-5 mr-1" />
            <p>{imdbRating}</p>
          </div>

          <span className="mx-2">•</span>

          {/* Language */}
          <p className='lang capitalize'>{primaryLanguage}</p>

          <span className="mx-2">•</span>

          {/* Year */}
          <p className='year'>{Year ? String(Year).split('-')[0] : 'N/A'}</p>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
