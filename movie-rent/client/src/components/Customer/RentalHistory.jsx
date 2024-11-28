import React, { useState, useEffect } from 'react';
import api from '../../services/api';

const RentalHistory = () => {
  const [rentals, setRentals] = useState([]);

  useEffect(() => {
    const fetchRentals = async () => {
      const response = await api.get('/customer/rentals');
      setRentals(response.data);
    };
    fetchRentals();
  }, []);

  return (
    <div className="bg-white p-4 shadow-md rounded">
      <h2 className="text-xl font-semibold mb-4">Rental History</h2>
      {rentals.map((rental) => (
        <div key={rental._id} className="border-b py-2">
          <p className="text-gray-700">Movie: {rental.movie.title}</p>
          <p className="text-sm text-gray-500">Status: {rental.status}</p>
          <p className="text-sm text-gray-500">Due Date: {new Date(rental.dueDate).toLocaleDateString()}</p>
        </div>
      ))}
    </div>
  );
};

export default RentalHistory;
