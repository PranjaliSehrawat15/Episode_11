import { useState } from 'react';

const GenreFilter = ({ genres, selectedGenres, onGenreChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleGenre = (genreId) => {
    if (selectedGenres.includes(genreId)) {
      onGenreChange(selectedGenres.filter(id => id !== genreId));
    } else {
      onGenreChange([...selectedGenres, genreId]);
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg"
      >
        <span>Filter by Genre</span>
        <svg
          className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      
      {isOpen && (
        <div className="absolute z-10 mt-2 w-64 bg-gray-800 rounded-lg shadow-lg p-3">
          <div className="grid grid-cols-2 gap-2">
            {genres.map(genre => (
              <label key={genre.id} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={selectedGenres.includes(genre.id)}
                  onChange={() => toggleGenre(genre.id)}
                  className="rounded text-yellow-500 focus:ring-yellow-500"
                />
                <span>{genre.name}</span>
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default GenreFilter;