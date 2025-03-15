import React from 'react'

const Search = ({ searchTerm, setSearchTerm }) => { // access props via pros object
return (
  <div className='search'>
    <div>
    <img src="search.svg" alt="search"/>
        <input type="text"
          placeholder='Search Through thousands of movies'
          value={searchTerm}
          onChange={(e) => setSearchTerm (e.target.value) } />
    
    </div>
  </div>
    
)
  
}

export default Search