import React, { useState, useEffect } from 'react';
import api from '../../services/api';

const BrowseMovies = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      const response = await api.get('/customer/movies');
      setMovies(response.data);
    };
    fetchMovies();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Browse Movies</h2>
      <div className="grid grid-cols-3 gap-4">
        {movies.map((movie) => (
          <div key={movie._id} className="bg-white p-4 shadow rounded">
            <h3 className="text-lg font-semibold">{movie.title}</h3>
            <p className="text-gray-500">{movie.genre}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BrowseMovies;
