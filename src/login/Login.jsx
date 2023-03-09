// Import required modules
import React, { useState } from 'react';
import {
} from 'react-router-dom';

import { backend } from "../env.js"
import "./Login.css"

// Define Login component
export function Login(props) {
  // Declare state variables
  const [studentId, setStudentId] = useState('');
  const [password, setPassword] = useState('');

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Make API call to authenticate user
    const response = await fetch(`${backend}/op/login`, {
      method: 'POST',
      body: JSON.stringify({ studentId, password }),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if (response.ok) {
      // Redirect to dashboard page
      alert("Logged in");
    } else {
      // Display error message
      alert('Invalid student ID or password');
    }
  };

  return (
    <div className="login-dialog">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Student ID
          <input
            type="text" required
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
          />
        </label>
        <br />
        <label>
          Password
          <input type="password" required
            value={password}
            onChange={(e) => setPassword(e.target.value)} />
        </label>
        <br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};