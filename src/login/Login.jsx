// Import required modules
import React, { useState } from 'react';
import {
  redirect,
  Form,
} from 'react-router-dom';

import { backend } from "../env.js"
import "./Login.css"

export async function action({ request }) {
  const formData = await request.formData()
  const credentials = Object.fromEntries(formData)
  const response = await fetch(backend.login, {
    method: 'POST',
    body: JSON.stringify(credentials),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  const payload = await response.json()
  if (response.ok) {
    localStorage.setItem("jwt", payload.token)
    return redirect("/dashboard")
  } else {
    alert('Invalid student ID or password');
  }
}

// Define Login component
export function Login(props) {
  return (
    <div className="login-dialog">
      <h1>Login</h1>
      <Form method="post" id="login-form">
        <span>Student ID</span>
        <input
          type="text" required
          name="studentId"
        />
        <br />
        <span>Password</span>
        <input type="password" required
          name="password"
        />
        <br />
        <button type="submit">Login</button>
      </Form>
    </div>
  );
};