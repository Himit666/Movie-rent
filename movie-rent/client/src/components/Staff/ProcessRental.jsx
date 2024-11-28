import React, { useState, useEffect } from 'react';
import api from '../../services/api';

const ProcessRental = () => {
  const [customers, setCustomers] = useState([]);
  const [movies, setMovies] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState('');
  const [selectedMovie, setSelectedMovie] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const customersRes = await api.get('/admin/user');
      const moviesRes = await api.get('/admin/movie');
      setCustomers(customersRes.data.filter((user) => user.role === 'Customer'));
      setMovies(moviesRes.data);
    };
    fetchData();
  }, []);

  const handleProcessRental = async () => {
    try {
      await api.post('/staff/rental', { movie: selectedMovie, customer: selectedCustomer });
      alert('Rental processed successfully');
    } catch (error) {
      console.error('Error processing rental:', error);
    }
  };

  return (
    <div className="bg-white p-6 rounded shadow-md">
      <h2 className="text-xl font-bold mb-4">Process Rental</h2>
      <div className="mb-4">
        <label className="block text-gray-700">Select Customer</label>
        <select
          className="w-full border px-3 py-2 rounded"
          onChange={(e) => setSelectedCustomer(e.target.value)}
          value={selectedCustomer}
        >
          <option value="">Choose a customer</option>
          {customers.map((customer) => (
            <option key={customer._id} value={customer._id}>{customer.name}</option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Select Movie</label>
        <select
          className="w-full border px-3 py-2 rounded"
          onChange={(e) => setSelectedMovie(e.target.value)}
          value={selectedMovie}
        >
          <option value="">Choose a movie</option>
          {movies.map((movie) => (
            <option key={movie._id} value={movie._id}>{movie.title}</option>
          ))}
        </select>
      </div>
      <button onClick={handleProcessRental} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        Process Rental
      </button>
    </div>
  );
};

export default ProcessRental;
