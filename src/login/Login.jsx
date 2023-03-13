// Import required modules
import React, { useState } from 'react';
import {
  redirect,
  Form,
} from 'react-router-dom';

import {
  backend,
  i18n
} from "../env.js"
import { composeAuthHeader } from '../request.js';
import "./login.css"

export async function loader({ request }) {
  const jwt = localStorage.getItem("jwt")
  if (jwt === null) return null
  const response = await fetch(backend.validate, {
    method: 'POST',
    headers: {
      Authorization: composeAuthHeader(jwt),
      'Content-Type': 'application/json',
    }
  })
  if (response.ok) {
    return redirect("/dashboard")
  } else {
    return null
  }
}

/**
 * Handle log in
 */
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
    <div id="login-dialog">
      <h1>{i18n.get("appName")}</h1>
      <Form method="post" id="login-form">
        <span>{i18n.get("student.studentId")}</span>
        <input
          type="text" required
          name="studentId"
        />
        <br />
        <span>{i18n.get("password")}</span>
        <input type="password" required
          name="password"
        />
        <br />
        <button type="submit">{i18n.get("login")}</button>
      </Form>
    </div>
  );
};