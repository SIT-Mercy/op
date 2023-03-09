// Import required modules
import React, { useState } from 'react';
import {
} from 'react-router-dom';

// Define Login component
export function Login(props) {
  // Declare state variables
  const [studentId, setStudentId] = useState('');
  const [password, setPassword] = useState('');

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Make API call to authenticate user
    const response = await fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (response.ok) {
      // Redirect to dashboard page
      history.push('/dashboard');
    } else {
      // Display error message
      alert('Invalid email or password');
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </label>
        <br />
        <label>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </label>
        <br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};