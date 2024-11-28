import React, { useState, useEffect } from 'react';
import api from '../../services/api';

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    password: '',
    role: 'Customer'
  });

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await api.get('/admin/user'); // Fetch users
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    fetchUsers();
  }, []);

  const handleDeleteUser = async (userId) => {
    try {
      await api.delete(`/admin/user/${userId}`);
      setUsers(users.filter((user) => user._id !== userId));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleAddUser = async () => {
    try {
      const response = await api.post('/admin/user', newUser); // Add user API call
      setUsers([...users, response.data]); // Add the new user to the users list
      setNewUser({ name: '', email: '', password: '', role: 'Customer' }); // Reset the form
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  return (
    <div className="bg-white p-4 shadow-md rounded">
      <h2 className="text-xl font-semibold mb-4">Manage Users</h2>

      {/* Form for adding a new user */}
      <div className="mb-4">
        <h3 className="text-lg font-bold mb-2">Add New User</h3>
        <input
          type="text"
          placeholder="Name"
          value={newUser.name}
          onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
          className="mr-2 px-2 py-1 border rounded"
        />
        <input
          type="email"
          placeholder="Email"
          value={newUser.email}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
          className="mr-2 px-2 py-1 border rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={newUser.password}
          onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
          className="mr-2 px-2 py-1 border rounded"
        />
        <select
          value={newUser.role}
          onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
          className="mr-2 px-2 py-1 border rounded"
        >
          <option value="Customer">Customer</option>
          <option value="Staff">Staff</option>
          <option value="Admin">Admin</option>
        </select>
        <button
          onClick={handleAddUser}
          className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
        >
          Add User
        </button>
      </div>

      {/* List of existing users */}
      {users.map((user) => (
        <div key={user._id} className="border-b py-2 flex justify-between">
          <div>
            <p className="text-gray-700">{user.name}</p>
            <p className="text-sm text-gray-500">{user.email}</p>
            <p className="text-sm text-gray-500">Role: {user.role}</p>
          </div>
          <button
            onClick={() => handleDeleteUser(user._id)}
            className="text-red-500 hover:text-red-700"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default ManageUsers;
