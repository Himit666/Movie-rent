import React from 'react';
import ManageUsers from './ManageUsers';
import ManageMovies from './ManageMovies';

const AdminDashboard = () => {
  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <div className="grid grid-cols-2 gap-6">
        <ManageUsers />
        <ManageMovies />
      </div>
    </div>
  );
};

export default AdminDashboard;
