// Import required modules
import { Button, TextField } from '@mui/material';
import React, { useState } from 'react';
import {
  redirect,
  Form,
} from 'react-router-dom';

import {
  backend,
  env,
  i18n
} from "../env.js"
import { composeAuthHeader } from '../request.js';
import "./login.css"

export async function loader({ request }) {
  const jwt = env.loginInfo?.jwt;
  if (!jwt) return null
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
    env.loginInfo = payload
    return redirect("/dashboard/students")
  } else {
    alert('Invalid student ID or password');
    return null
  }
}

const studentIdRegex = /^(\d{6}[YGHE\d]\d{3})$/i
// Define Login component
const validateStudentId = (text) => {
  if (text.length === 0) return true
  return text.length === 10 && studentIdRegex.test(text)
}
export function Login(props) {
  const [studentId, setStudentId] = useState("")
  const valid = validateStudentId(studentId)
  return (
    <div id="login-dialog">
      <h1>{i18n.get("appName")}</h1>
      <Form method="post" id="login-form">
        <TextField
          type="text" required
          name="studentId"
          error={!valid}
          helperText={valid ? null : i18n.get("login.invalidStudentId")}
          onChange={(e) => {
            setStudentId(e.target.value)
          }}
          label={i18n.get("student.studentId")}
        />
        <br />
        <TextField
          type="password" required
          label={i18n.get("login.password")}
          name="password"
        />
        <br />
        <Button type="submit">{i18n.get("login.login")}</Button>
      </Form>
    </div>
  );
};