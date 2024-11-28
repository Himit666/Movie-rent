import React, { useState, useEffect } from 'react';
import api from '../../services/api';

const ManageMovies = () => {
  const [movies, setMovies] = useState([]);
  const [newMovie, setNewMovie] = useState({ title: '', genre: '', stock: 0, rentalPrice: 0 });

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await api.get('/admin/movie'); // Fetch movies
        setMovies(response.data);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };
    fetchMovies();
  }, []);

  const handleDeleteMovie = async (movieId) => {
    try {
      await api.delete(`/admin/movie/${movieId}`);
      setMovies(movies.filter((movie) => movie._id !== movieId));
    } catch (error) {
      console.error('Error deleting movie:', error);
    }
  };

  const handleAddMovie = async () => {
    try {
      const response = await api.post('/admin/movie', newMovie);
      setMovies([...movies, response.data]);
      setNewMovie({ title: '', genre: '', stock: 0, rentalPrice: 0 });
    } catch (error) {
      console.error('Error adding movie:', error);
    }
  };

  return (
    <div className="bg-white p-4 shadow-md rounded">
      <h2 className="text-xl font-semibold mb-4">Manage Movies</h2>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Title"
          value={newMovie.title}
          onChange={(e) => setNewMovie({ ...newMovie, title: e.target.value })}
          className="mr-2 px-2 py-1 border rounded"
        />
        <input
          type="text"
          placeholder="Genre"
          value={newMovie.genre}
          onChange={(e) => setNewMovie({ ...newMovie, genre: e.target.value })}
          className="mr-2 px-2 py-1 border rounded"
        />
        <input
          type="number"
          placeholder="Stock"
          value={newMovie.stock}
          onChange={(e) => setNewMovie({ ...newMovie, stock: Number(e.target.value) })}
          className="mr-2 px-2 py-1 border rounded"
        />
        <input
          type="number"
          placeholder="Rental Price"
          value={newMovie.rentalPrice}
          onChange={(e) => setNewMovie({ ...newMovie, rentalPrice: Number(e.target.value) })}
          className="mr-2 px-2 py-1 border rounded"
        />
        <button
          onClick={handleAddMovie}
          className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
        >
          Add Movie
        </button>
      </div>
      {movies.map((movie) => (
        <div key={movie._id} className="border-b py-2 flex justify-between">
          <div>
            <p className="text-gray-700">{movie.title}</p>
            <p className="text-sm text-gray-500">{movie.genre}</p>
          </div>
          <button
            onClick={() => handleDeleteMovie(movie._id)}
            className="text-red-500 hover:text-red-700"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default ManageMovies;
