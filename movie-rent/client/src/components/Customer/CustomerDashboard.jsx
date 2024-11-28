import React from 'react';
import BrowseMovies from './BrowseMovies';
import RentalHistory from './RentalHistory';

const CustomerDashboard = () => {
  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6">Customer Dashboard</h1>
      <div className="grid grid-cols-2 gap-6">
        <BrowseMovies />
        <RentalHistory />
      </div>
    </div>
  );
};

export default CustomerDashboard;
